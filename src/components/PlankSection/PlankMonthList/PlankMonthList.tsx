import React from "react";
import styled from "styled-components";

import { data } from "../../../mock/plank-mock";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";

const PlankSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PlankMonthList = () => {
  return (
    <>
      {data.map((itemData: any, index: number) => {
        return (
          <PlankSectionContainer key={index}>
            {Object.keys(itemData).map((item: string, index) => {
              return (
                <PlankMonthListItem
                  key={index}
                  itemData={itemData}
                  item={item}
                />
              );
            })}
          </PlankSectionContainer>
        );
      })}
    </>
  );
};

export default PlankMonthList;
