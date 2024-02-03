const mongoose = require("mongoose");

exports.db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db is connected...");
  } catch (error) {
    console.log("error while connecting DB", error);
  }
};
