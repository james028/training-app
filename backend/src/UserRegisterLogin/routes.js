const { handleRegister } = require("./controller");

exports.routesConfig = function (app) {
  app.post("/api/auth/register", handleRegister);
  //app.post("/api/user/login", "");
};
