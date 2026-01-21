import React from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

import Loading from "../../shared/Loading/Loading";
import { useAppContext } from "../../../appContext/appContext";
import { URL } from "../../../constants";

const PlankMonthList = () => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

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

  const data1: any[] = [[]];

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
