const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "marvel-app";
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${dbName}.jok4pyx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connect = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log(`Connected to DB`);
    await db
      .collection("users")
      .insertOne({ name: "Jordan", password: "fg7s6j3l2zSSd" });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

connect();
