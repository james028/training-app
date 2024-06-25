const mongooseTest = require("../common/mongoose.service");

const Schema = mongooseTest.Schema;

const RecordSchemaTest = new Schema({
  id: { type: Number, required: true },
  duration: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: Number, required: true },
  isDifferentExercises: { type: String, required: true },
});

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

const MainSchema = new Schema({}, options);

for (let i = 1; i <= 12; i++) {
  MainSchema.add({ [`${i}`]: [RecordSchemaTest] });
}

const PlankTestDataModel = mongooseTest.model("data-test", MainSchema);

module.exports = PlankTestDataModel;
