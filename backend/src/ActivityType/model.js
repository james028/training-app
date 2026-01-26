const mongoose = require("../common/mongoose.service");
const Schema = mongoose.Schema;

const MainSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    activityName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#000000",
    },
  },
  {
    timestamps: true,
  },
);

const ActivityTypeDataModel = mongoose.model("ActivityType", MainSchema);

module.exports = ActivityTypeDataModel;
