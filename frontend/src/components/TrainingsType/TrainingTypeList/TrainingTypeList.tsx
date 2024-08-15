import React, { useEffect, useState } from "react";

const TrainingTypeList = ({ dataTrainingType }: any) => {
  const [columns, setColumns] = useState<string[]>([]);

  const displayColumns = () => {
    const keys = dataTrainingType?.reduce((acc: string[], obj: {}) => {
      Object.keys(obj).forEach((key) => {
        //temporary
        if (key !== "_id") {
          if (!acc.includes(key)) {
            //zrobić na key i label
            acc.push(key);
          }
        }
      });
      return acc;
    }, []);

    setColumns(keys);
  };

  useEffect(() => {
    displayColumns();
  }, [dataTrainingType]);

  //dodać loading

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
            dataTrainingType?.map((item: Record<string, string>) => {
              return (
                <tr key={item._id}>
                  {columns &&
                    columns.map((it: string) => {
                      return (
                        <th
                          key={it}
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
