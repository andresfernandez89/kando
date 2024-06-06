import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGO_URI;

if (!process.env.MONGO_URI) {
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
