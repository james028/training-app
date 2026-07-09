const mongoose = require("../common/mongoose.service");

const Schema = mongoose.Schema;

const PlankSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  duration: { type: String, required: true },
  date: { type: Date, required: true },
  isDifferentExercises: { type: Boolean, required: true, default: false },
});

const PlankDataModel = mongoose.model("plank-exercises", PlankSchema);
module.exports = PlankDataModel;
