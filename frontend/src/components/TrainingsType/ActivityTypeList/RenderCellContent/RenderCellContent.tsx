import React from "react";
import { TrainingTypeList } from "../TrainingTypeList";

interface TableCellProps {
  columnKey: keyof TrainingTypeList | string;
  //columnKey: string;
  value: string | number | boolean | null | undefined;
  row: TrainingTypeList;
  onEdit: (row: TrainingTypeList) => void;
}

const RenderCellContent = ({
  columnKey,
  value,
  row,
  onEdit,
}: TableCellProps) => {
  switch (columnKey) {
    case "color":
      return <td>color</td>;
    case "type":
      return <td>type</td>;
    default:
      return (
        <td>
          {String(value ?? "")}
          <button
            onClick={() => onEdit(row)} // Wywołanie edycji
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edytuj"
          >
            Edit
          </button>
        </td>
      );
  }
};

export default RenderCellContent;
