// Usage: node resetPassword.js <username> <newPassword>
// Example: node resetPassword.js naga Naga@2026

import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "logindb";

const [username, newPassword] = process.argv.slice(2);

if (!username || !newPassword) {
  console.log("Usage: node resetPassword.js <username> <newPassword>");
  process.exit(1);
}

const client = new MongoClient(MONGO_URL);

try {
  await client.connect();
  const users = client.db(DB_NAME).collection("users");

  // New password-ah hash pannurom (10 = salt rounds, un DB la irukkura $2b$10 same)
  const hashed = await bcrypt.hash(newPassword, 10);

  const result = await users.updateOne(
    { username },
    { $set: { password: hashed } },
  );

  if (result.matchedCount === 0) {
    console.log(`"${username}" user DB la illa ❌`);
  } else {
    console.log(`"${username}" password maathiyaachu ✅`);
  }
} catch (err) {
  console.error("Error:", err);
} finally {
  await client.close();
}
