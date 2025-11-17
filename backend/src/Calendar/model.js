const mongoose = require("../common/mongoose.service.js");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  id: { type: String, required: true },
  trainingType: { type: String, required: true },
  duration: { type: String, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  bikeType: { type: String, required: false },
  bikeKilometers: { type: Number, required: false },
});

const MainSchema = new Schema({}, null);
const MainSchema2 = new Schema({}, null);

for (let i = 1; i <= 12; i++) {
  MainSchema.add({ [`${i}`]: [RecordSchema] });
  for (let j = 1; j <= 31; j++) {
    MainSchema2.add({ [`${j}`]: [MainSchema] });
  }
}

// moze tak jak powzezej // maybe that like above
const CalendarDataModel = mongoose.model("calendar-list-data", MainSchema2);

module.exports = CalendarDataModel;
