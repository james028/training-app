const mongoose = require("../common/mongoose.service.js");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  //id: { type: String, required: true },
  trainingType: { type: String, required: true },
  duration: { type: String, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  bikeType: { type: String, required: false },
  bikeKilometers: { type: Number, required: false },
  dateTime: {
    type: Date,
    required: true,
    index: true,
  },
});

const monthlyCalendarSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true, index: true },
    yearMonthKey: { type: String, required: true, index: true },
    days: [
      {
        dayNumber: { type: Number, required: true, min: 1, max: 31 },
        tasks: [RecordSchema],
      },
    ],
  },
  {
    timestamps: true,
  },
);

const CalendarDataModel = mongoose.model(
  "calendar-month-list-data",
  monthlyCalendarSchema,
);

module.exports = CalendarDataModel;
