import React from "react";
import { data } from "../../../mock/plank-mock";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";

const PlankMonthList = () => {
  return (
    <>
      {data.map((itemData: any, index: number) => {
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
      })}
    </>
  );
};

export default PlankMonthList;
