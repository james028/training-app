const { handleRegister, handleLogin, handleLogout } = require("./controller");
const { registerValidators } = require("./validators/registerValidators");

exports.routesConfig = function (app) {
  app.post("/api/auth/register", registerValidators, handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
};
