import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URL;

if (!process.env.MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}
client = new MongoClient(uri!);
clientPromise = client.connect();

clientPromise.then(() => {
  console.log("Connect successful to MongoDB");
});

export default clientPromise;
