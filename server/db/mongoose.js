const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DBNAME}.jok4pyx.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => { 
  try {
    await mongoose.connect(uri, {dbName: process.env.MONGO_DBNAME});
    console.log(`Connected to DB`);
  } catch (error) {
    console.error(error);
  }
};

connect();