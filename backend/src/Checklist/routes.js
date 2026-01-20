const {
  getChecklistItems,
  createChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
} = require("./controller");
const {
  authMiddleware,
} = require("../UserRegisterLogin/middleware/auth.middleware");

exports.routesConfig = function (app) {
  app.get("/api/checklist/list", authMiddleware, getChecklistItems);
  app.post("/api/checklist/create", authMiddleware, createChecklistItem);
  app.patch("/api/checklist/:id/toggle", authMiddleware, toggleChecklistItem);
  app.delete("/api/checklist/:id", authMiddleware, deleteChecklistItem);
};
