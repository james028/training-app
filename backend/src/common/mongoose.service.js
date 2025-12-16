const mongoose = require("mongoose");
const { set } = require("mongoose");

set("strictQuery", false);

const mongoDB_URI = process.env.MONGO_URI;

//const mongoDB = "mongodb://127.0.0.1/TrainingAppData";

async function main() {
  await mongoose.connect(mongoDB_URI, {});
}

main().catch((err) => console.log(err, "err"));

module.exports = mongoose;
