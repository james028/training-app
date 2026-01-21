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
  app.post("/api/activities/edit/:id", editAddedTraining);
  app.post("/api/activities/delete/:id", deleteExistTraining);
};
