// Usage: node setUser.js <username> <password> <email>
// Example: node setUser.js admin Admin@123 admin@gmail.com
//
// User irundha -> password + email update pannum
// User illa na -> pudhusa create pannum

import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const [username, password, email] = process.argv.slice(2);

if (!username || !password || !email) {
  console.log("Usage: node setUser.js <username> <password> <email>");
  process.exit(1);
}

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const users = client.db("logindb").collection("users");

  const hashed = await bcrypt.hash(password, 10);

  const result = await users.updateOne(
    { username },
    { $set: { password: hashed, email } },
    { upsert: true },
  );

  console.log(
    result.upsertedCount ? "🆕 Pudhu user create aagiduchu" : "♻️ Existing user update aagiduchu",
  );

  // DB la irundhu thirumba padichi verify
  const user = await users.findOne({ username });
  const ok = await bcrypt.compare(password, user.password);

  console.log("username :", user.username);
  console.log("email    :", user.email);
  console.log("hash     :", user.password.slice(0, 20) + "...");
  console.log(ok ? "✅ Password match aagudhu. Login try pannunga!" : "❌ Match aagala");
} catch (err) {
  console.error("Error:", err);
} finally {
  await client.close();
}
