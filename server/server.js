import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import {
  randomInt,
  randomBytes,
  generateKeyPairSync,
  createPrivateKey,
  createPublicKey,
  privateDecrypt,
  constants,
} from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { MongoClient } from "mongodb";

// .env file irundha padikkum (SMTP_USER, SMTP_PASS). Illana skip aagum.
try {
  process.loadEnvFile();
} catch {
  /* .env illa - paravaala, OTP terminal la print aagum */
}

const app = express();
// FRONTEND_URL set panna (Vercel URL) andha site mattum API call panna mudiyum
app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json({ limit: "10kb" })); // periya body anuppi server-ah slow panna mudiyaadhu

// Live la Atlas connection string (env), local la Compass address
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const DB_NAME = "logindb";

const OTP_EXPIRY_MIN = 5; // OTP 5 minutes valid
const MAX_ATTEMPTS = 5; // 5 thadavai thappa potta OTP delete aagidum
const RESEND_WAIT_SEC = 30; // resend ku 30 sec wait
const SESSION_HOURS = 1; // session token 1 hour valid

const client = new MongoClient(MONGO_URL);

// String illaadha value (object / array) vandhaalum crash aagaama empty string aakkum
const str = (value) => (typeof value === "string" ? value.trim() : "");

// ---------- Password encrypt / decrypt (RSA) ----------
// Public key  -> browser ku tharuvom (password-ah encrypt panna)
// Private key -> server kulla mattum (decrypt panna), engayum anuppaadhu
//
// Private key eduthukkura order:
//  1) PRIVATE_KEY_BASE64 env  (live: Render Environment la)
//  2) keys/private.pem file   (local: node generateKeys.js run pannina apram)
//  3) rendum illa na temporary key (restart pannaa maarum)
function loadPrivateKey() {
  if (process.env.PRIVATE_KEY_BASE64) {
    console.log("🔑 Private key: env la irundhu eduthuchu");
    const pem = Buffer.from(process.env.PRIVATE_KEY_BASE64, "base64").toString(
      "utf8",
    );
    return createPrivateKey(pem);
  }

  const file = new URL("./keys/private.pem", import.meta.url);
  if (existsSync(file)) {
    console.log("🔑 Private key: keys/private.pem file la irundhu eduthuchu");
    return createPrivateKey(readFileSync(file, "utf8"));
  }

  console.log(
    "⚠️ Private key illa -> temporary key (restart pannaa maarum). node generateKeys.js run pannunga",
  );
  return generateKeyPairSync("rsa", { modulusLength: 2048 }).privateKey;
}

const privateKey = loadPrivateKey();

// Public key-ah private key la irundhu eduthukkalaam (thani file venaam)
const publicKeyPem = createPublicKey(privateKey).export({
  type: "spki",
  format: "pem",
});

// One-time nonce: oru encrypted request-ah thirumba anuppa (replay) mudiyaadhu
const NONCE_TTL_MS = 2 * 60 * 1000;
const nonces = new Map(); // nonce -> expire time

function createNonce() {
  const nonce = randomBytes(16).toString("hex");
  nonces.set(nonce, Date.now() + NONCE_TTL_MS);
  return nonce;
}

function useNonce(nonce) {
  const expires = nonces.get(nonce);
  nonces.delete(nonce); // oru thadavai mattum use aagum
  return expires !== undefined && expires > Date.now();
}

setInterval(() => {
  const now = Date.now();
  for (const [nonce, expires] of nonces) {
    if (expires < now) nonces.delete(nonce);
  }
}, 60 * 1000).unref();

// Browser anuppina encrypted text -> original password (thappu na null)
function decryptPassword(encryptedBase64) {
  try {
    const decrypted = privateDecrypt(
      {
        key: privateKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(encryptedBase64, "base64"),
    );

    const { password, nonce } = JSON.parse(decrypted.toString("utf8"));

    if (typeof password !== "string" || !useNonce(nonce)) return null;
    return password;
  } catch {
    return null;
  }
}

// Mail options:
//  1) BREVO_API_KEY -> Brevo HTTP API (Render free la idhu dhaan work aagum)
//  2) SMTP_USER + SMTP_PASS -> Gmail SMTP (local PC la mattum; Render free la SMTP block)
//  3) rendum illa -> OTP server logs/terminal la print aagum
const brevoReady = process.env.BREVO_API_KEY && process.env.MAIL_FROM;
const smtpReady = process.env.SMTP_USER && process.env.SMTP_PASS;
const mailReady = brevoReady || smtpReady;
const transporter = smtpReady
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

// Mail anuppu. Anuppina true, mail setup illa na false
async function sendMail(to, subject, text) {
  if (brevoReady) {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Credo Systemz", email: process.env.MAIL_FROM },
        to: [{ email: to }],
        subject,
        textContent: text,
      }),
    });
    if (!r.ok) throw new Error(`Brevo ${r.status}: ${await r.text()}`);
    return true;
  }

  if (transporter) {
    await transporter.sendMail({
      from: `"Credo Systemz" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
    return true;
  }

  return false;
}

// abc@gmail.com -> a***@gmail.com
function maskEmail(email) {
  const [name, domain] = email.split("@");
  return `${name[0]}***@${domain}`;
}

// 6 digit random OTP uruvaakki DB la save pannitu mail anuppum
async function createAndSendOtp(user, otpsCollection) {
  const otp = String(randomInt(100000, 1000000)); // 100000 - 999999

  await otpsCollection.updateOne(
    { username: user.username },
    {
      $set: {
        otp, // learning ku plain - Compass la paakka
        attempts: 0,
        sentAt: new Date(),
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MIN * 60 * 1000),
      },
    },
    { upsert: true },
  );

  const sent = await sendMail(
    user.email,
    "Your login OTP",
    `Your OTP is ${otp}. It is valid for ${OTP_EXPIRY_MIN} minutes.`,
  );

  if (!sent) {
    console.log(`📩 [DEV] ${user.username} (${user.email}) OTP: ${otp}`);
  }
}

// Random long session token (64 hex characters) - guess panna mudiyaadhu
function createToken() {
  return randomBytes(32).toString("hex");
}

async function start() {
  await client.connect();
  console.log("MongoDB connected ✅");

  const db = client.db(DB_NAME);
  const users = db.collection("users");
  const otps = db.collection("otps");
  const sessions = db.collection("sessions");

  // expiresAt time aanadhum MongoDB thaanaa OTP / session-ah delete pannidum
  await otps.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await sessions.createIndex({ token: 1 }, { unique: true });

  // Protected API ku kaaval: valid session token illana 401
  async function requireAuth(req, res, next) {
    try {
      const header = req.headers.authorization || "";
      const token = header.startsWith("Bearer ") ? header.slice(7) : "";

      if (!token) {
        return res.status(401).json({ message: "Login pannunga" });
      }

      const session = await sessions.findOne({ token });

      if (!session || session.expiresAt < new Date()) {
        if (session) await sessions.deleteOne({ token });
        return res.status(401).json({
          message: "Session expire aagiduchu. Thirumba login pannunga",
        });
      }

      const user = await users.findOne({ username: session.username });
      if (!user) {
        await sessions.deleteOne({ token });
        return res.status(401).json({ message: "User illa" });
      }

      const { password: _pw, ...safeUser } = user;
      req.user = safeUser;
      req.token = token;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  console.log(
    mailReady
      ? "Email mode: OTP real mail la pogum 📧"
      : "Dev mode: OTP ingaye terminal / logs la print aagum (mail setup illa)",
  );

  // Login ku munnaadi: public key + one-time nonce vaangurom
  app.get("/api/public-key", (req, res) => {
    // Nonce map periya aagama paathukka (spam request kaaval)
    if (nonces.size > 5000) {
      return res
        .status(429)
        .json({ message: "Romba request. Konjam neram kazhichu try pannunga" });
    }
    res.json({ publicKey: publicKeyPem, nonce: createNonce() });
  });

  // STEP 1: username + password check -> OTP anuppu
  app.post("/api/login", async (req, res) => {
    try {
      const { username, encryptedPassword } = req.body;

      if (
        !str(username) ||
        typeof encryptedPassword !== "string" ||
        !encryptedPassword
      ) {
        return res.status(400).json({ message: "Username & password venum" });
      }

      // Encrypted password-ah decrypt pannurom
      const password = decryptPassword(encryptedPassword);
      if (!password) {
        return res
          .status(400)
          .json({ message: "Request expire aagiduchu. Thirumba try pannunga" });
      }

      const user = await users.findOne({ username: str(username) });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Username or password Wrong 😕" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Username or password Wrong 😕" });
      }

      if (!user.email) {
        return res.status(400).json({
          message:
            "Indha user ku email illa. Compass la email field add pannunga",
        });
      }

      try {
        await createAndSendOtp(user, otps);
      } catch (mailErr) {
        console.error("OTP mail error:", mailErr.message);
        return res
          .status(500)
          .json({ message: "OTP anuppa mudiyala. .env check pannunga" });
      }

      res.json({
        otpRequired: true,
        username: user.username,
        message: `OTP anuppiyaachu: ${maskEmail(user.email)}`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // STEP 2: OTP check -> login
  app.post("/api/verify-otp", async (req, res) => {
    try {
      const username = str(req.body.username);
      const otp = String(req.body.otp ?? "").trim();

      if (!username || !otp) {
        return res.status(400).json({ message: "OTP venum" });
      }

      const record = await otps.findOne({ username });

      if (!record) {
        return res
          .status(400)
          .json({ message: "OTP expire aagiduchu. Thirumba login pannunga" });
      }

      if (record.expiresAt < new Date()) {
        await otps.deleteOne({ username });
        return res
          .status(400)
          .json({ message: "OTP expire aagiduchu. Thirumba login pannunga" });
      }

      if (record.attempts >= MAX_ATTEMPTS) {
        await otps.deleteOne({ username });
        return res
          .status(429)
          .json({ message: "Romba thappu attempt. Thirumba login pannunga" });
      }

      if (record.otp !== otp) {
        await otps.updateOne({ username }, { $inc: { attempts: 1 } });
        return res.status(401).json({ message: "OTP thappu 😕" });
      }

      // OTP correct -> oru thadavai mattum use aagum, so delete
      await otps.deleteOne({ username });

      const user = await users.findOne({ username });
      const { password: _pw, ...safeUser } = user;

      // Session create: token DB la save, browser ku anuppurom
      const token = createToken();
      const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);

      await sessions.insertOne({
        token, // learning ku plain - Compass la paakka
        username,
        createdAt: new Date(),
        expiresAt,
      });

      res.json({ user: safeUser, token, expiresAt });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // OTP varala na thirumba anuppa
  app.post("/api/resend-otp", async (req, res) => {
    try {
      const username = str(req.body.username);

      // Password step mudichavangalukku mattum (OTP record irukkanum)
      const record = await otps.findOne({ username });
      if (!record) {
        return res.status(400).json({ message: "Thirumba login pannunga" });
      }

      const waited = (Date.now() - record.sentAt.getTime()) / 1000;
      if (waited < RESEND_WAIT_SEC) {
        const left = Math.ceil(RESEND_WAIT_SEC - waited);
        return res
          .status(429)
          .json({ message: `${left} sec la thirumba try pannunga` });
      }

      const user = await users.findOne({ username });

      try {
        await createAndSendOtp(user, otps);
      } catch (mailErr) {
        console.error("OTP mail error:", mailErr.message);
        return res.status(500).json({ message: "OTP anuppa mudiyala" });
      }

      res.json({ message: `Pudhu OTP anuppiyaachu: ${maskEmail(user.email)}` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Session valid ah nu check (page refresh la use aagum)
  app.get("/api/me", requireAuth, (req, res) => {
    res.json({ user: req.user });
  });

  // Logout: DB la irundhu session delete
  app.post("/api/logout", requireAuth, async (req, res) => {
    try {
      await sessions.deleteOne({ token: req.token });
      res.json({ message: "Logout aagiduchu" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Protected API example: login pannavangalukku mattum employees data
  app.get("/api/employees", requireAuth, async (req, res) => {
    try {
      const employees = await db.collection("employees").find().toArray();
      res.json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Products: DB la irukkura ella products (pudhusu mela varum)
  app.get("/api/products", requireAuth, async (req, res) => {
    try {
      const products = await db
        .collection("products")
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Render/Railway "PORT" env tharum; local la 5000
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start().catch((err) => {
  console.error("MongoDB connect aagala ❌", err);
});
