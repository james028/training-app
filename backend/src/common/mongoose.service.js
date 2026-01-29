const mongoose = require("mongoose");
const { set } = require("mongoose");

set("strictQuery", false);

const isProduction = process.env.NODE_ENV === "production";
const config = {
  development: {
    uri: "mongodb://127.0.0.1:27017/TrainingAppData",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  production: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "training_app_prod",
    },
  },
};

const { uri, options } = isProduction ? config.production : config.development;

async function main() {
  await mongoose.connect(uri, options);
}

main().catch((err) => console.log(err, "err"));

module.exports = mongoose;
