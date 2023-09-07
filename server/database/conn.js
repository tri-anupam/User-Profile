import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  try {
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(getUri);
    console.log("Database connected");
    return db;
  } catch (error) {
    console.log(`Error in db connection ${error}`);
  }
}

export default connect;
