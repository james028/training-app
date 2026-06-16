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
const {
  validateCreatePlank,
  validateUpdatePlank,
  validateObjectId,
  validateYearQuery,
} = require("./validators/plankValidators");

exports.routesConfig = function (app) {
  app.get("/api/plank/list", authMiddleware, validateYearQuery, getPlank);
  app.post(
    "/api/plank/create",
    authMiddleware,
    validateCreatePlank,
    createPlank,
  );
  app.patch(
    "/api/plank/update/:id",
    authMiddleware,
    validateObjectId,
    updatePlank,
  );
  app.delete(
    "/api/plank/delete/:id",
    authMiddleware,
    validateObjectId,
    deletePlank,
  );

  app.get("/api/plank/test/list", getPlankTest);
  app.post("/api/plank/test/create", createPlankTest);
  app.patch("/api/plank/test/update", updatePlankTest);
  app.delete("/api/plank/test/delete", deletePlankTest);
};
