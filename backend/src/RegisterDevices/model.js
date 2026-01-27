const mongoose = require("../common/mongoose.service");
const Schema = mongoose.Schema;

const MainSchema = new Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },
    deviceName: {
      type: String,
      required: false,
    },
    ip: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    //   index: true,
    // },
  },
  {
    timestamps: true,
  },
);

const RegisteredDevicesDataModel = mongoose.model(
  "RegisteredDevices",
  MainSchema,
);

module.exports = RegisteredDevicesDataModel;
