const asyncHandler = require("express-async-handler");
const CalendarDataModel = require("./model");

// @desc    Gets all months with workouts on a given day
// @route   GET /api/calendar/list
exports.getCalendarDataList = asyncHandler(async (req, res) => {
  try {
    const calendarDataList = await CalendarDataModel.find({}, null, null);

    console.log(calendarDataList, calendarDataList);
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Create new training
// @route   POST /api/calendar/create
exports.createNewTraining = asyncHandler(async (req, res) => {
  console.log(req.body, " body creaate");

  //req.body.month = 1,2,3,4...
  try {
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});
