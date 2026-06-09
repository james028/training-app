const {
  getChecklistItems,
  createChecklistItem,
  createNewSetInChecklist,
  deleteChecklistSet,
  toggleChecklistItem,
  deleteChecklistItem,
} = require("./controller");
const {
  authMiddleware,
} = require("../UserRegisterLogin/middleware/auth.middleware");

exports.routesConfig = function (app) {
  app.get("/api/checklists", authMiddleware, getChecklistItems);
  app.post("/api/checklists", authMiddleware, createNewSetInChecklist);
  app.delete("/api/checklists/:setId", authMiddleware, deleteChecklistSet);
  app.post("/api/checklists/:setId/items", authMiddleware, createChecklistItem);
  app.patch(
    "/api/checklists/:setId/items/:itemId",
    authMiddleware,
    toggleChecklistItem,
  );
  app.delete(
    "/api/checklists/:setId/items/:itemId",
    authMiddleware,
    deleteChecklistItem,
  );
};
