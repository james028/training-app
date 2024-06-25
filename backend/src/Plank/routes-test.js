const {
  getPlank,
  createPlank,
  updatePlank,
  deletePlank,
} = require("./controller-test");

exports.routesConfigTest = function (app) {
  app.get("/api/plank/test/list", getPlank);
  app.post("/api/plank/test/create", createPlank);
  app.patch("/api/plank/test/update", updatePlank);
  app.delete("/api/plank/test/delete", deletePlank);
};
