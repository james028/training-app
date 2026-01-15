import React from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

import Loading from "../../shared/Loading/Loading";
import { useAppContext } from "../../../appContext/appContext";
import { URL } from "../../../constants";
import { TPlankData } from "../../../types";

const PlankMonthList = () => {
  const { user } = useAppContext();
  const token = user?.accessToken ?? "691c7f9f7ff1367b95d4037c";

  const { data, status, isRefetching } = useGetApi({
    link: `${URL}api/plank/list`,
    queryKey: ["plankList"],
    headers: { Authorization: `Bearer ${token}` },
  });

  //zmienic
  if (status === "loading" || isRefetching) {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  console.log(data);

  const data1: TPlankData[] = [];
  return (
    <>
      {data1?.length > 0 ? (
        data1.map((itemData: any, index: number) => {
          console.log(itemData, "itemData", itemData);
          return (
            <StyledPlankSectionContainer key={index}>
              {Object.keys(itemData).map((item: string, index: number) => {
                return (
                  <PlankMonthListItem
                    key={index}
                    itemData={itemData}
                    item={item}
                  />
                );
              })}
            </StyledPlankSectionContainer>
          );
        })
      ) : (
        <div className="mt-3">Brak danych</div>
      )}
    </>
  );
};

export default PlankMonthList;
