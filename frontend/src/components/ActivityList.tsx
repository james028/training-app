// components/ActivityTypeSelect.tsx

import { useActivityTypes } from "../hooks/useActivity";

export const ActivityList = () => {
  const { data, isLoading } = useActivityTypes();

  const activityData = data?.data ?? [];

  if (isLoading) return <div>Ładowanie...</div>;

  return (
    <div style={{ padding: 8, fontSize: 16, minWidth: 220 }}>
      {/*<option value="">— wybierz typ aktywności —</option>*/}
      {activityData?.map((item) => (
        <li
          key={item.id}
          value={item.id}
          style={{ backgroundColor: item.color, color: "#fff" }}
        >
          {item.activityName} ({item.type})
        </li>
      ))}
    </div>
  );
};
