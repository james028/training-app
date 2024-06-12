const {
  getPlank,
  createPlank,
  updatePlank,
  deletePlank,
} = require("./controller");

exports.routesConfig = function (app) {
  app.get("/api/plank/list", getPlank);
  app.post("/api/plank/create", createPlank);
  app.patch("/api/plank/update", updatePlank);
  app.delete("/api/plank/delete", deletePlank);
};
