// export const ACTIVITY_KEYS = {
//     // Główny klucz-matka (wszystko co dotyczy aktywności)
//     all: ['activities'] as const,
//
//     // Klucze dla list (np. w panelu bocznym, w tabeli edycji)
//     lists: () => [...ACTIVITY_KEYS.all, 'list'] as const,
//
//     // Klucze dla list z filtrowaniem (jeśli np. wyszukujesz aktywności)
//     list: (filters: string) => [...ACTIVITY_KEYS.lists(), { filters }] as const,
//
//     // Klucze dla konkretnych szczegółów (np. edycja konkretnego ID)
//     details: () => [...ACTIVITY_KEYS.all, 'detail'] as const,
//     detail: (id: string | undefined) => [...ACTIVITY_KEYS.details(), id] as const,
//
//     // Możesz dodać inne moduły tutaj
//     // trainings: () => ['trainings'] as const,
// };

export const ACTIVITY_KEYS = {
  // Wspólny mianownik dla wszystkich kluczy związanych z typami aktywności
  // Pozwala na: queryClient.invalidateQueries({ queryKey: ACTIVITY_KEYS.all })
  all: ["activityTypes"] as const,

  // 1. Klucz dla listy (GET) - Twoje "activityTypeList"
  // Teraz jest częścią "all", więc łatwo go masowo odświeżać
  activityTypeList: () => [...ACTIVITY_KEYS.all, "list"] as const,

  // 2. Klucz dla operacji (MUTATION) - Twoje "createActivityTypeList"
  // Używany jako identyfikator samej akcji tworzenia/edycji
  createActivityType: () => [...ACTIVITY_KEYS.all, "create"] as const,

  // 3. Klucz dla konkretnego ID
  // Bardzo przydatne przy PATCH - precyzyjnie określa, co zmieniamy
  editActivity: (id: string | undefined) =>
    [...ACTIVITY_KEYS.all, "edit", id] as const,
  removeActivity: (id: string | undefined) =>
    [...ACTIVITY_KEYS.all, "remove", id] as const,
};

export const CALEDAR_KEYS = {
  all: ["calendar"] as const,
  calendarMonthlyList: ({ filters }: Record<string, any>) =>
    [...CALEDAR_KEYS.all, "calendarMonthlyList", { filters }] as const,
  createCalendarActivity: () => [...CALEDAR_KEYS.all, "create"] as const,
};

export const CHECKLIST_KEYS = {
  all: ["checklist"] as const,
  checkList: () => [...CHECKLIST_KEYS.all, "list"] as const,
  checkListCreate: () => [...CHECKLIST_KEYS.all, "create"] as const,
  checkListToggle: (id: string | undefined) =>
    [...CHECKLIST_KEYS.all, "toggle", id] as const,
  checkListDelete: (id: string | undefined) =>
    [...CHECKLIST_KEYS.all, "delete", id] as const,
};

export const DEVICE_KEYS = {
  all: ["device"] as const,
  checkList: () => [...DEVICE_KEYS.all, "list"] as const,
  checkListCreate: () => [...CHECKLIST_KEYS.all, "create"] as const,
};
