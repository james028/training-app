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
    toJSON: {
      virtuals: true,
      versionKey: false, // Automatycznie usuwa pole '__v'
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    timestamps: true,
  },
);

const ActivityTypeDataModel = mongoose.model("ActivityType", MainSchema);

module.exports = ActivityTypeDataModel;
