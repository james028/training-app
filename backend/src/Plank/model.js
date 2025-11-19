const mongoose = require("../common/mongoose.service.js");

const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
    duration: { type: String, required: true },
    month: { type: String, required: true },
    day: { type: Number, required: true },
    isDifferentExercises: { type: String, required: true },
  },
  { timestamps: true },
);

const omitPrivate = (doc, obj) => {
  delete obj.__v;
  delete obj._id;
  return obj;
};

let options = {
  toJSON: {
    transform: omitPrivate,
  },
};

const MainSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  options,
);

for (let i = 1; i <= 12; i++) {
  MainSchema.add({ [`${i}`]: [RecordSchema] });
}

const PlankDataModel = mongoose.model("plank-data", MainSchema);

module.exports = PlankDataModel;
