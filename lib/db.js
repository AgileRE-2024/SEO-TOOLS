import { MongoClient } from "mongodb";
export async function connectToDB() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");


  return client;
}
