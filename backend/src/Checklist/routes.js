const {
  getChecklistItems,
  createChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem,
  createNewSetInChecklist,
  deleteChecklistSet,
} = require("./controller");
const {
  authMiddleware,
} = require("../UserRegisterLogin/middleware/auth.middleware");

exports.routesConfig = function (app) {
  app.get("/api/checklist/list", authMiddleware, getChecklistItems);
  app.post(
    "/api/checklist/set/create",
    authMiddleware,
    createNewSetInChecklist,
  );
  app.post("/api/checklist/create/:setId", authMiddleware, createChecklistItem);
  app.patch(
    "/api/checklist/:setId/toggle-item/:itemId",
    authMiddleware,
    toggleChecklistItem,
  );
  app.delete("/api/checklist/:setId", authMiddleware, deleteChecklistSet);
  app.delete(
    "/api/checklist/:setId/item-remove/:itemId",
    authMiddleware,
    deleteChecklistItem,
  );
};
