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
  CALENDAR: {
    MONTHLY_LIST: "api/activities/list",
    CREATE_ACTIVITY: "api/activities/create",
  },
  CHECKLIST: {
    LIST: "api/checklist/list",
    CREATE: "api/checklist/create",
    TOGGLE: (id: string) => `api/checklist/${id}/toggle`,
    DELETE: (id: string) => `api/checklist/${id}`,
  },
} as const;
