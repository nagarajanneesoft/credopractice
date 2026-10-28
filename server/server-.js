import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { randomInt, randomBytes } from "node:crypto";
import { MongoClient } from "mongodb";

// .env file irundha padikkum (SMTP_USER, SMTP_PASS). Illana skip aagum.
try {
  process.loadEnvFile();
} catch {
  /* .env illa - paravaala, OTP terminal la print aagum */
}

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "logindb";

const OTP_EXPIRY_MIN = 5; // OTP 5 minutes valid
const MAX_ATTEMPTS = 5; // 5 thadavai thappa potta OTP delete aagidum
const RESEND_WAIT_SEC = 30; // resend ku 30 sec wait
const SESSION_HOURS = 1; // session token 1 hour valid

const client = new MongoClient(MONGO_URL);

// Email settings iruntha mattum real mail anuppum
const mailReady = process.env.SMTP_USER && process.env.SMTP_PASS;
const transporter = mailReady
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

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

  if (transporter) {
    await transporter.sendMail({
      from: `"Credo Systemz" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Your login OTP",
      text: `Your OTP is ${otp}. It is valid for ${OTP_EXPIRY_MIN} minutes.`,
    });
  } else {
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
      : "Dev mode: OTP ingaye terminal la print aagum (.env illa)",
  );

  // STEP 1: username + password check -> OTP anuppu
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username & password venum" });
      }

      const user = await users.findOne({ username: username.trim() });
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
      const username = (req.body.username || "").trim();
      const otp = String(req.body.otp || "").trim();

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
      // const rftoken = refresh_token();

      await sessions.insertOne({
        token, // learning ku plain - Compass la paakka
        // rftoken,
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
      const username = (req.body.username || "").trim();

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
    await sessions.deleteOne({ token: req.token });
    res.json({ message: "Logout aagiduchu" });
  });

  // Protected API example: login pannavangalukku mattum employees data
  app.get("/api/employees", requireAuth, async (req, res) => {
    const employees = await db.collection("employees").find().toArray();
    res.json(employees);
  });

  app.listen(5000, () =>
    console.log("Server running on http://localhost:5000"),
  );
}

start().catch((err) => {
  console.error("MongoDB connect aagala ❌", err);
});
