const mongoose = require("mongoose");
const { set } = require("mongoose");

set("strictQuery", false);

//const mongoDB_URI = process.env.MONGO_URI;

// 1. Definicja, którego URI użyć
let mongoDB_URI;
const mongoDB = "mongodb://127.0.0.1/TrainingAppData";

if (process.env.NODE_ENV === "production") {
  // Aplikacja działa na Render.com - użyj produkcyjnej bazy danych
  mongoDB_URI = process.env.MONGO_URI;
  console.log("Łączenie z bazą: PRODUCTION");
} else {
  // Aplikacja działa lokalnie (lub w innym trybie) - użyj testowej bazy danych
  mongoDB_URI = mongoDB;
  console.log("Łączenie z bazą: DEVELOPMENT");
}

async function main() {
  await mongoose.connect(mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main().catch((err) => console.log(err, "err"));

module.exports = mongoose;
