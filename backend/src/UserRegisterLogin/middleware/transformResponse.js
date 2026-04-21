const mongoose = require("mongoose");

// middleware/transformResponse.js
function transformIds(data) {
  if (!data) return data;

  if (data instanceof mongoose.Types.ObjectId) return data.toString();

  // Zamiana dokumentu Mongoose na czysty obiekt (kluczowe dla uniknięcia pętli)
  if (typeof data.toObject === "function") {
    data = data.toObject();
  }

  if (Array.isArray(data)) return data.map(transformIds);

  if (typeof data === "object" && data !== null) {
    // Zabezpieczenie przed obiektami typu Date
    if (data instanceof Date) return data.toISOString();

    const newObj = {};
    for (const key in data) {
      // FILTR: Ignorujemy bebechy Mongoose'a
      if (key.startsWith("$") || key.startsWith("__")) continue;

      const newKey = key === "_id" ? "id" : key;
      newObj[newKey] = transformIds(data[key]);
    }
    return newObj;
  }
  return data;
}

// Ten middleware sprawia, że res.json() w każdym kontrolerze
// automatycznie użyje transformIds
exports.transformResponse = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (data) => originalJson(transformIds(data));
  next();
};
