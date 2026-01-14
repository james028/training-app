import React from "react";
import Loading from "../../shared/Loading/Loading";
import { StyledColorContainer } from "../style";
import RenderCellContent from "./RenderCellContent/RenderCellContent";

//zmienić nazwę
//zmieniać własciwosci na be
export type TrainingTypeList = {
  _id: string;
  type: string;
  trainingName: string;
  color: string;
};

type Columns = {
  key: string;
  label: string;
};

type TrainingTypeListProps = {
  dataTrainingType: TrainingTypeList[];
  status: string;
  isRefetching: boolean;
  onEdit: (item: TrainingTypeList) => void;
};

enum TrainingTypeEnum {
  trainingName = "Nazwa",
  color = "Kolor",
}

const COLUMN_NAMES: Record<string, string> = {
  type: "Typ",
  trainingName: "Nazwa aktywności",
  color: "Kolor",
  createdAt: "Data utworzenia",
};

const ActivityTypeList: React.FC<TrainingTypeListProps> = ({
  dataTrainingType,
  status,
  isRefetching,
  onEdit,
}) => {
  // const [columns, setColumns] = useState<Columns[]>([]);
  //
  // const displayColumns = () => {
  //   if (!dataTrainingType?.length) return;
  //
  //   const newDataTrainingType = [...dataTrainingType];
  //
  //   const keysArray = newDataTrainingType?.reduce(
  //     (acc: string[], obj: TrainingTypeList) => {
  //       const { _id, type, ...rest } = obj;
  //       Object.keys(rest).forEach((key) => {
  //         if (!acc.includes(key)) {
  //           acc.push(key);
  //         }
  //       });
  //       return acc;
  //     },
  //     [],
  //   );
  //
  //   console.log(keysArray, "keys");
  //
  //   const labels = keysArray.map((item) => ({
  //     key: item,
  //     label: TrainingTypeEnum[item as keyof typeof TrainingTypeEnum],
  //   })) as Columns[];
  //
  //   setColumns(labels);
  // };
  //
  // console.log(columns, "1");
  //
  // useEffect(() => {
  //   displayColumns();
  // }, [dataTrainingType]);

  const HIDDE_FIELDS = ["_id", "type"];

  const getTableColumns = (data: any[]) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    const firstItem = Object.keys(data[0]);
    return firstItem
      .filter((key) => !HIDDE_FIELDS.includes(key))
      .map((key) => {
        return {
          key,
          label: COLUMN_NAMES[key] || key,
        };
      });
  };
  const columns = getTableColumns(dataTrainingType);

  console.log(columns, "columns");

  if (status === "loading" || isRefetching) {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  //brak danych wyswietlić

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column: any) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataTrainingType.map((row: TrainingTypeList) => (
            <tr key={row._id}>
              {columns.map((col: Columns) => {
                // if (it.key === "color") {
                //   return (
                //     <td className="flex items-center pt-1">
                //       <div key={it.key} className="w-16">
                //         {item[it.key as keyof typeof item] || "-"}
                //       </div>
                //       <StyledColorContainer
                //         color={item.color}
                //       ></StyledColorContainer>
                //     </td>
                //   );
                // }

                return (
                  <>
                    <RenderCellContent
                      columnKey={col.key}
                      value={row[col as unknown as keyof TrainingTypeList]}
                      row={row}
                      onEdit={onEdit}
                    />
                    {/*<td*/}
                    {/*  key={it.key}*/}
                    {/*  scope="row"*/}
                    {/*  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"*/}
                    {/*>*/}
                    {/*  {item[it.key as keyof typeof item] || "-"}*/}
                    {/*</td>*/}
                    {/*<td>*/}
                    {/*  <button*/}
                    {/*    onClick={() => onEdit(item)}*/}
                    {/*    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"*/}
                    {/*    title="Edytuj"*/}
                    {/*  >*/}
                    {/*    Edit*/}
                    {/*  </button>*/}
                    {/*</td>*/}
                  </>
                );
              })}
            </tr>
          ))}
          {dataTrainingType?.length > 0 ? (
            dataTrainingType?.map((item: TrainingTypeList) => {
              return (
                <tr key={item._id}>
                  {columns &&
                    columns.map((it: Columns) => {
                      if (it.key === "color") {
                        return (
                          <td className="flex items-center pt-1">
                            <div key={it.key} className="w-16">
                              {item[it.key as keyof typeof item] || "-"}
                            </div>
                            <StyledColorContainer
                              color={item.color}
                            ></StyledColorContainer>
                          </td>
                        );
                      }

                      return (
                        <>
                          <td
                            key={it.key}
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item[it.key as keyof typeof item] || "-"}
                          </td>
                          <td>
                            <button
                              onClick={() => onEdit(item)} // Wywołanie edycji
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Edytuj"
                            >
                              Edit
                            </button>
                          </td>
                        </>
                      );
                    })}
                </tr>
              );
            })
          ) : (
            <div className="mt-3">Brak danych</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTypeList;
