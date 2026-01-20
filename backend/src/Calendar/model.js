const mongoose = require("../common/mongoose.service.js");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  activity: {
    type: Schema.Types.ObjectId,
    ref: "ActivityType",
    required: true,
  },
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
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

const CalendarDataModel = mongoose.model("Activities", monthlyCalendarSchema);

module.exports = CalendarDataModel;
