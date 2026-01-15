import React from "react";
import { ActivityType } from "../ActivityTypeList";
import { StyledColorContainer } from "../../style";

interface TableCellProps {
  columnKey: keyof ActivityType | string;
  value: string | number | boolean | null | undefined;
  row: ActivityType;
  onEdit: (row: ActivityType) => void;
}

const RenderCellContent = ({
  columnKey,
  value,
  row,
  onEdit,
}: TableCellProps) => {
  switch (columnKey) {
    case "color":
      return (
        <td className="flex items-center pt-1">
          <div className="w-16">{value || "-"}</div>
          <StyledColorContainer color={row.color}></StyledColorContainer>
        </td>
      );
    case "type":
      return <td>type</td>;
    case "action":
      return (
        <td>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(row)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edytuj"
            >
              Edytuj
            </button>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => null}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Usuń"
            >
              Usuń
            </button>
          </div>
        </td>
      );
    default:
      return (
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {String(value || "")}
        </td>
      );
  }
};

export default RenderCellContent;
