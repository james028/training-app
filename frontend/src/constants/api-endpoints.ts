export const API_ENDPOINTS = {
  ACTIVITIES: {
    LIST: "api/activity-type/list",
    CREATE: "api/activity-type/create",
    EDIT: (id: string) => `api/activity-type/edit/${id}`,
    REMOVE: (id: string) => `api/activity-type/remove/${id}`,
  },
  TRAINING_TYPES: {},
  AUTH: {
    LOGIN: "",
    LOGOUT: "",
  },
} as const;
