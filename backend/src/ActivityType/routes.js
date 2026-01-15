const {
  getListActivityType,
  updateActivityType,
  deleteActivityType,
  createActivityType,
} = require("./controller");

exports.routesConfig = function (app) {
  app.get("/api/activity-type/list", getListActivityType);
  app.post("/api/activity-type/create", createActivityType);
  app.patch("/api/activity-type/edit/:id", updateActivityType);
  app.delete("/api/activity-type/remove/:id", deleteActivityType);
};
