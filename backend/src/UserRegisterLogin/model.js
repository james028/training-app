const mongoose = require("../common/mongoose.service");

const Schema = mongoose.Schema;

const userRegisterLoginSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userRegisterLoginSchema);

module.exports = UserModel;
