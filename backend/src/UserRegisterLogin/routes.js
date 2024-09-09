const { handleRegister } = require("./controller");

exports.routesConfig = function (app) {
  app.post("/api/user/register", handleRegister);
  //app.post("/api/user/login", "");
};
