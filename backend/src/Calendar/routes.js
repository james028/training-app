const { getCalendarDataList, createNewTraining } = require("./controller");

exports.routesConfig = function (app) {
  app.get("/api/calendar/list", getCalendarDataList);
  app.post("/api/calendar/create", createNewTraining);
};
