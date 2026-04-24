const {
  editAddedTraining,
  deleteExistTraining,
  getActivitiesList,
  addNewActivityToCalendar,
} = require("./controller");
const {
  authMiddleware,
} = require("../UserRegisterLogin/middleware/auth.middleware");

exports.routesConfig = function (app) {
  app.get("/api/activities/list", authMiddleware, getActivitiesList);
  app.post("/api/activities/create", authMiddleware, addNewActivityToCalendar);
  app.patch("/api/activities/edit/:id", authMiddleware, editAddedTraining);
  app.post("/api/activities/delete/:id", authMiddleware, deleteExistTraining);
};
