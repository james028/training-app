const {
  getRegisteredDevices,
  addOrRefreshRegisterDevice,
} = require("./controller");
const {
  authMiddleware,
} = require("../UserRegisterLogin/middleware/auth.middleware");

exports.routesConfig = function (app) {
  app.get("/api/devices/list", getRegisteredDevices);
  app.post("/api/devices/create", authMiddleware, addOrRefreshRegisterDevice);
};
