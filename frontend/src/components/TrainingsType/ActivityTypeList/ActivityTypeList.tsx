import React, { useMemo } from "react";
import Loading from "../../shared/Loading/Loading";
import RenderCellContent from "./RenderCellContent/RenderCellContent";
import { COLUMN_NAMES, HIDDE_FIELDS } from "../../../constants";
import { ActivityType, ActivityTypeListProps, Columns } from "../../../types";

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
  const columns = useMemo(() => {
    return getTableColumns(dataActivityType);
  }, [dataActivityType]);

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
                const key = col.key as keyof ActivityType | "action";
                const value = key !== "action" ? row[key] : undefined;

                return (
                  <RenderCellContent
                    key={col.key}
                    columnKey={col.key}
                    value={value}
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
