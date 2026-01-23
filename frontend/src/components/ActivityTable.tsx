// components/ActivityTypeTable.tsx
import { useState } from "react";
import {
  type ActivityType,
  useActivityTypes,
  useUpdateActivityType,
} from "../hooks/useActivity";

export const ActivityTypeTable = () => {
  const { data, isLoading } = useActivityTypes();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editColor, setEditColor] = useState<string>("");
  const [editText, setEditText] = useState<string>("");

  const { mutateAsync: update } = useUpdateActivityType(editingId ?? "");

  // const startEdit = (id: string, currentColor: string) => {
  //   setEditingId(id);
  //   setEditColor(currentColor);
  // };

  const saveEdit = async (id: string, item: ActivityType) => {
    try {
      console.log(id);
      // @ts-ignore
      // @ts-ignore
      await update({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment

        bodyData: {
          color: editColor ? editColor : item.color,
          activityName: draftValue ? draftValue : item.activityName,
        },
        successMessage: "Kolor zaktualizowany",
      });
      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleInputChange = (id: number, newValue: string) => {
  //   setActivities((prevActivities) =>
  //     prevActivities.map((item) =>
  //       // Jeśli to ten element, który edytujemy, stwórz nową wersję z nową nazwą
  //       item.id === id ? { ...item, name: newValue } : item,
  //     ),
  //   );
  // };

  const [draftValue, setDraftValue] = useState("");

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setDraftValue(currentName); // Kopiujemy z RQ do useState
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftValue("");
  };

  console.log(draftValue);
  const activityData = data?.data ?? [];
  if (isLoading) return <div>Ładowanie...</div>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Typ</th>
          <th>Kolor</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {activityData?.map((item) => (
          <tr key={item.id}>
            <td>
              {editingId === item.id ? (
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    value={draftValue}
                    onChange={(e) => setDraftValue(e.target.value)}
                  />
                  <button onClick={() => saveEdit(item.id, item)}>
                    Zapisz
                  </button>
                  <button onClick={cancelEdit}>Anuluj</button>
                </span>
              ) : (
                <div onClick={() => startEdit(item.id, item.activityName)}>
                  {item.activityName} ✏️
                </div>
              )}
            </td>
            <td>{item?.type}</td>
            <td>
              {editingId === item.id ? (
                <>
                  <input
                    type="color"
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                  />
                </>
              ) : (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: item.color,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                  }}
                />
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <>
                  <button onClick={() => saveEdit(item.id, item)}>
                    Zapisz
                  </button>
                  <button onClick={() => setEditingId(null)}>Anuluj</button>
                </>
              ) : (
                <button onClick={() => startEdit(item.id, item.color)}>
                  Edytuj kolor
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
