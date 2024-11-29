import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function getUserHistory(userId) {
  const client = await connectToDB();
  const db = client.db("SEOBoost");
  const usersCollection = db.collection("users");

  const userHistory = await usersCollection.findOne(
    { _id: new ObjectId(userId) },
    { projection: { keywords: 1 } }
  );

  return userHistory?.keywords || [];
}
