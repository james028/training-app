import React, { useEffect, useState } from "react";

const TrainingTypeList = ({ dataTrainingType }: any) => {
  // if (dataTrainingType.length === 0) {
  //   return <div>Brak danych</div>;
  // }
  const [columns, setColumns] = useState<{ it: string; label: string }[]>([]);

  const displayColumns = () => {
    //if (dataTrainingType?.length > 0) {
    console.log("dsdsad");
    console.log(dataTrainingType, "a");
    const columnsArr: { it: string; label: string }[] = [];
    const x = dataTrainingType?.map((item: any) => {
      console.log(Object.keys(item).length, "length");
      return Object.keys(item).map((it) => {
        columnsArr.push({
          it,
          label: "AA",
        });
      });
    });

    console.log(columnsArr, "xx");

    setColumns(columnsArr);
    //}
  };

  useEffect(() => {
    displayColumns();
  }, []);

  console.log(columns, " it: string; label: string }[]");

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
          </tr>
        </thead>
        <tbody>
          {dataTrainingType?.length > 0 ? (
            dataTrainingType?.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  {columns &&
                    columns.map((it: any, index: number) => {
                      console.log(item[it], it, item, "item");
                      return (
                        <th
                          key={index}
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item[it] ?? "-"}
                        </th>
                      );
                    })}
                </tr>
              );
            })
          ) : (
            <div>Brak danych</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTypeList;
