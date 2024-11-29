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

export async function ensureUserExists(userId) {
  const client = await connectToDB();
  const db = client.db("SEOBoost");
  const usersCollection = db.collection("users");

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $setOnInsert: { keywords: [] } },
    { upsert: true }
  );
}

export async function updateKeywordHistory(userId, keyword) {
  const client = await connectToDB();
  const db = client.db("SEOBoost");
  const usersCollection = db.collection("users");

  const keywordExists = await usersCollection.findOne({
    _id: new ObjectId(userId),
    "keywords.keyword": keyword,
  });

  if (keywordExists) {
    await usersCollection.updateOne(
      { _id: new ObjectId(userId), "keywords.keyword": keyword },
      { $set: { "keywords.$.accessedAt": new Date() } }
    );
  } else {
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { keywords: { keyword, accessedAt: new Date() } } }
    );
  }
}

