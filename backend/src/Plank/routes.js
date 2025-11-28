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
const {
  authMiddleware,
} = require("../UserRegisterLogin/middleware/auth.middleware");

exports.routesConfig = function (app) {
  app.get("/api/plank/list", authMiddleware, getPlank);
  app.post("/api/plank/create", authMiddleware, createPlank);
  app.patch("/api/plank/update", updatePlank);
  app.delete("/api/plank/delete", deletePlank);

  app.get("/api/plank/test/list", getPlankTest);
  app.post("/api/plank/test/create", createPlankTest);
  app.patch("/api/plank/test/update", updatePlankTest);
  app.delete("/api/plank/test/delete", deletePlankTest);
};
