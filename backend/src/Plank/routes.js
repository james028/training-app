const {
  getPlank,
  createPlank,
  updatePlank,
  deletePlank,
} = require("./controller");

const {
  getPlankTest,
  createPlankTest,
  updatePlankTest,
  deletePlankTest,
} = require("./controller-test");

exports.routesConfig = function (app) {
  app.get("/api/plank/list", getPlank);
  app.post("/api/plank/create", createPlank);
  app.patch("/api/plank/update", updatePlank);
  app.delete("/api/plank/delete", deletePlank);

  app.get("/api/plank/test/list", getPlankTest);
  app.post("/api/plank/test/create", createPlankTest);
  app.patch("/api/plank/test/update", updatePlankTest);
  app.delete("/api/plank/test/delete", deletePlankTest);
};
