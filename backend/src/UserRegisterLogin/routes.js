const {
  handleRegister,
  handleLogin,
  handleLogout,
  registerValidators,
} = require("./controller");

exports.routesConfig = function (app) {
  app.post("/api/auth/register", registerValidators, handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
};
