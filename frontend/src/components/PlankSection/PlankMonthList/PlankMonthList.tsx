import React from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

import Loading from "../../shared/Loading/Loading";
import { useAppContext } from "../../../appContext/appContext";

const URL = "http://localhost:5001/";

const PlankMonthList = () => {
  const { link } = useAppContext();

  const { data, status, isRefetching } = useGetApi(
    `${URL}${link}/list`,
    ["plankList"],
    undefined,
  );

  if (status === "loading" || isRefetching) {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  return (
    <>
      {data?.length > 0
        ? data.map((itemData: any, index: number) => {
            return (
              <StyledPlankSectionContainer key={index}>
                {Object.keys(itemData).map((item: string, index) => {
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
        : null}
    </>
  );
};

export default PlankMonthList;
