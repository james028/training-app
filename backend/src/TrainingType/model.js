const mongoose = require("../common/mongoose.service");

const Schema = mongoose.Schema;

const omitPrivate = (doc, obj) => {
  for (const key of Object.keys(obj)) {
    if (obj.hasOwnProperty("__v")) {
      delete obj["__v"];
    }
    if (obj.hasOwnProperty("_id") && Object.keys(obj).length === 1) {
      delete obj[key];
    }
  }

  //console.log(obj, "obj");
  return obj;
};

let options = {
  toJSON: {
    transform: omitPrivate,
  },
};

const MainSchema = new Schema(
  {
    id: { type: String, required: false },
    type: { type: String, required: false },
    trainingName: { type: String, required: false },
    color: { type: String, required: false },
  },
  options,
);

const TrainingTypeDataModel = mongoose.model("training-type-data", MainSchema);

module.exports = TrainingTypeDataModel;
