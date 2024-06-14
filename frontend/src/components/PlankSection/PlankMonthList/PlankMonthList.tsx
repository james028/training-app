import React from "react";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";

const PlankMonthList = () => {
  const { data, status } = useGetApi(
    "http://localhost:5001/api/plank/list",
    ["plankList"],
    undefined,
  );

  if (status === "loading") {
    return <div>Loading...</div>;
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
