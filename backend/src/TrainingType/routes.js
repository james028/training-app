const { createTrainingType, getListTrainingType } = require("./controller");

exports.routesConfig = function (app) {
  app.get("/api/training-type/list", getListTrainingType);
  app.post("/api/training-type/create", createTrainingType);
};
