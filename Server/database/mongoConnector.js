require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  const connectionString = process.env.MONGO_CONNECTION_STRING

  try {
    let connection = await mongoose
      .connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
        keepAlive: true,
        keepAliveInitialDelay: 300000,
      })
      .then((conn) => {
        console.log("connection OK");
        return conn;
      })
      .catch((error) => {
        console.log("connection FAILED", error);
        return false;
      });
  } catch (error) {
    //someting went wrong
    console.log("Cant connect to db", error);
  }
};

module.exports = { connectDb };
