// Run: node generateKeys.js
// RSA private + public key create panni keys/ folder la save pannum (oru thadavai mattum)

import { generateKeyPairSync } from "node:crypto";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const dir = new URL("./keys/", import.meta.url);
const privateFile = new URL("./private.pem", dir);
const publicFile = new URL("./public.pem", dir);

if (existsSync(privateFile)) {
  console.log(
    "⚠️ keys/private.pem already irukku. Pudhu key venum na andha file ah delete pannitu thirumba run pannunga.",
  );
  process.exit(0);
}

mkdirSync(dir, { recursive: true });

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

writeFileSync(privateFile, privateKey);
writeFileSync(publicFile, publicKey);

console.log("✅ keys/private.pem & keys/public.pem create aagiduchu");
console.log("");
console.log(
  "Live (Render) ku, Environment la idha PRIVATE_KEY_BASE64 nu podunga:",
);
console.log(Buffer.from(privateKey).toString("base64"));
console.log("");
console.log(
  "⚠️ Private key-ah yaarkittayum share pannaadheenga, GitHub la push pannaadheenga.",
);
