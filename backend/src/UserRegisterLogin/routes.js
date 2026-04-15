const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleAuthMe,
} = require("./controller");
const { registerValidators } = require("./validators/registerValidators");
const { authMiddleware } = require("./middleware/auth.middleware");

exports.routesConfig = function (app) {
  app.post("/api/auth/register", registerValidators, handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/me", authMiddleware, handleAuthMe);
};
