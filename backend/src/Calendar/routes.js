const {
  getCalendarDataList,
  createNewTraining,
  editAddedTraining,
  deleteExistTraining,
} = require("./controller");
const { getPlank } = require("../Plank/controller");

exports.routesConfig = function (app) {
  app.get("/api/calendar/list", getCalendarDataList);
  app.post("/api/calendar/create", createNewTraining);
  app.post("/api/calendar/edit", editAddedTraining);
  app.post("/api/calendar/delete/:id", deleteExistTraining);
};
