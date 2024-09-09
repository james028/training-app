const mongoose = require("../common/mongoose.service");

const Schema = mongoose.Schema;

const userRegisterLoginSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("UserRegisterLogin", userRegisterLoginSchema);

module.exports = UserModel;
