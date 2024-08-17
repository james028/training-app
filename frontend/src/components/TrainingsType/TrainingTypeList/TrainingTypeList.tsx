import React, { useEffect, useState } from "react";
import Loading from "../../shared/Loading/Loading";
import { StyledColorContainer } from "../style";

type TrainingTypeList = {
  _id: string;
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
};

enum TrainingTypeEnum {
  trainingName = "Nazwa",
  color = "Kolor",
}

const TrainingTypeList: React.FC<TrainingTypeListProps> = ({
  dataTrainingType,
  status,
  isRefetching,
}) => {
  const [columns, setColumns] = useState<Columns[]>([]);

  const displayColumns = () => {
    if (!dataTrainingType) return;

    const newDataTrainingType = [...dataTrainingType];

    const keysArray = newDataTrainingType?.reduce(
      (acc: string[], obj: TrainingTypeList) => {
        const { _id, ...rest } = obj;
        Object.keys(rest).forEach((key) => {
          if (!acc.includes(key)) {
            acc.push(key);
          }
        });
        return acc;
      },
      [],
    );

    const labels = keysArray.map((item) => ({
      key: item,
      label: TrainingTypeEnum[item as keyof typeof TrainingTypeEnum],
    })) as Columns[];

    setColumns(labels);
  };

  useEffect(() => {
    displayColumns();
  }, [dataTrainingType]);

  if (status === "loading" || isRefetching) {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error...</div>;
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
          {dataTrainingType?.length > 0 ? (
            dataTrainingType?.map((item: TrainingTypeList) => {
              return (
                <tr key={item._id}>
                  {columns &&
                    columns.map((it: Columns) => {
                      if (it.key === "color") {
                        return (
                          <div className="flex items-center">
                            <div key={it.key} className="w-16">
                              {item[it.key as keyof typeof item] || "-"}
                            </div>
                            <StyledColorContainer
                              color={item.color}
                            ></StyledColorContainer>
                          </div>
                        );
                      }

                      return (
                        <th
                          key={it.key}
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item[it.key as keyof typeof item] || "-"}
                        </th>
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

export default TrainingTypeList;
