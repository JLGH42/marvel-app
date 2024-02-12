const mongoose = require("mongoose");
require("dotenv").config();

const dbName = "marvel-app";
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${dbName}.jok4pyx.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`Connected to DB`);
  } catch (error) {
    console.error(error);
  }
};

connect();