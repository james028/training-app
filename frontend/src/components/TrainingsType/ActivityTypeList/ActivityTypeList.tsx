import React from "react";
import Loading from "../../shared/Loading/Loading";
import RenderCellContent from "./RenderCellContent/RenderCellContent";

export type ActivityType = {
  id: string;
  type: string;
  activityName: string;
  color: string;
};

type Columns = {
  key: string;
  label: string;
};

type ActivityTypeListProps = {
  dataActivityType: ActivityType[];
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;
  onEdit: (item: ActivityType) => void;
  onDelete: (item: ActivityType) => void;
};

const COLUMN_NAMES: Record<string, string> = {
  type: "Typ",
  activityName: "Nazwa aktywności",
  color: "Kolor",
  createdAt: "Data utworzenia",
  updatedAt: "Data aktualizacji",
};

const HIDDE_FIELDS = ["_id", "type"];

const ActivityTypeList: React.FC<ActivityTypeListProps> = ({
  dataActivityType,
  isLoading,
  isError,
  isRefetching,
  onEdit,
  onDelete,
}) => {
  const getTableColumns = (data: ActivityType[]) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    const firstItem = Object.keys(data[0]);
    const labels = firstItem
      .filter((key) => !HIDDE_FIELDS.includes(key))
      .map((key) => {
        return {
          key,
          label: COLUMN_NAMES[key] || key,
        };
      });

    return [...labels, { key: "action", label: "Akcje" }];
  };
  const columns = getTableColumns(dataActivityType);

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  if (isError) {
    return <div>Wystąpił błąd...</div>;
  }

  if (dataActivityType?.length === 0) {
    return <div className="mt-3">Brak danych</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column: Columns) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataActivityType.map((row) => (
            <tr key={row.id}>
              {columns.map((col: Columns) => {
                return (
                  <RenderCellContent
                    key={col.key}
                    columnKey={col.key}
                    value={row[col.key as unknown as keyof ActivityType]}
                    row={row}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTypeList;
