export const API_ENDPOINTS = {
  ACTIVITIES: {
    LIST: "api/activity-type/list",
    CREATE: "api/activity-type/create",
    EDIT: (id: string) => `api/activity-type/edit/${id}`,
    REMOVE: (id: string) => `api/activity-type/remove/${id}`,
  },
  TRAINING_TYPES: {},
  AUTH: {
    LOGIN: "api/auth/login",
    LOGOUT: "api/auth/logout",
    AUTH_ME: "api/auth/me",
  },
  CALENDAR: {
    MONTHLY_LIST: "api/activities/list",
    CREATE_ACTIVITY: "api/activities/create",
    EDIT_ACTIVITY: (id: string | undefined) => `api/activities/edit/${id}`,
    DELETE_ACTIVITY: (id: string) => `api/activities/delete/${id}`,
  },
  CHECKLIST: {
    LIST: "api/checklists",
    CREATE_SET: "api/checklists",
    DELETE_SET: (setId: string) => `api/checklists/${setId}`,
    CREATE_ITEM: (setId: string) => `api/checklists/${setId}/items`,
    UPDATE_ITEM: (setId: string, itemId: string) =>
      `api/checklists/${setId}/items/${itemId}`,
    DELETE_ITEM: (setId: string, itemId: string) =>
      `api/checklists/${setId}/items/${itemId}`,
  },
  PLANK: {
    LIST: "api/plank/list",
    CREATE: "api/plank/create",
    UPDATE: (id: string) => `api/plank/update/${id}`,
    DELETE: (id: string) => `api/plank/delete/${id}`,
  },
} as const;
