const { getCalendarDataList, createNewTraining } = require("./controller");
const { getPlank } = require("../Plank/controller");

exports.routesConfig = function (app) {
  app.get("/api/calendar/list", getCalendarDataList);
  app.post("/api/calendar/create", createNewTraining);
};
