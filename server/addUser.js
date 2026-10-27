// Usage: node addUser.js <username> <password> <email>
// Example: node addUser.js ravi Ravi@123 ravi@gmail.com

import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const [username, password, email] = process.argv.slice(2);

if (!username || !password || !email) {
  console.log("Usage: node addUser.js <username> <password> <email>");
  process.exit(1);
}

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const users = client.db("logindb").collection("users");

  const exists = await users.findOne({ username });
  if (exists) {
    console.log(`❌ "${username}" already irukku. Vera username use pannunga.`);
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await users.insertOne({ username, password: hashed, email });
    console.log(`✅ "${username}" user add aagiduchu`);
  }
} catch (err) {
  console.error("Error:", err);
} finally {
  await client.close();
}
