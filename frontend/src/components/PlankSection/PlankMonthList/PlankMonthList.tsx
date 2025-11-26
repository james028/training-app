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
  const token = user?.accessToken ?? {};

  const { data, status, isRefetching } = useGetApi(
    //`${URL}${linkUrl}/list`,
    `${URL}api/plank/list`,
    ["plankList"],
    undefined,
    undefined,
    { Authorization: `Bearer ${token}`, "X-Request-Id": "123456" },
  );

  if (status === "loading" || isRefetching) {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  console.log(data);

  return (
    <>
      {data?.length > 0 ? (
        data.map((itemData: TPlankData, index: number) => {
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
