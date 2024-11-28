import { MongoClient } from "mongodb";
export async function connectToDB() {
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  return client;
}
