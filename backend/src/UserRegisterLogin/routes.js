const { handleRegister, handleLogin, handleLogout } = require("./controller");

exports.routesConfig = function (app) {
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
};
