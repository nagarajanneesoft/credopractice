// Run: node fixPassword.js
// DB la admin password-ah direct ah set pannum, apram correct ah nu check pannum

import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const USERNAME = "admin";
const NEW_PASSWORD = "Admin@123";

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const users = client.db("logindb").collection("users");

  // 1) Hash generate + DB update
  const hashed = await bcrypt.hash(NEW_PASSWORD, 10);
  const result = await users.updateOne(
    { username: USERNAME },
    { $set: { password: hashed } },
  );
  console.log("Matched:", result.matchedCount, "| Modified:", result.modifiedCount);

  if (result.matchedCount === 0) {
    console.log(`❌ "${USERNAME}" user DB la illa. Compass la username spelling check pannunga.`);
  } else {
    // 2) DB la irundhu thirumba padichu check
    const user = await users.findOne({ username: USERNAME });
    console.log("Hash length (60 irukkanum):", user.password.length);
    const ok = await bcrypt.compare(NEW_PASSWORD, user.password);
    console.log(ok ? "✅ Password match aagudhu. Login try pannunga!" : "❌ Match aagala");
  }
} catch (err) {
  console.error("Error:", err);
} finally {
  await client.close();
}
