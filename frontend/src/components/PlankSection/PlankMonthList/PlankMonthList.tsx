import React from "react";
import { data } from "../../../mock/plank-mock";

import PlankMonthListItem from "../PlankMonthListItem/PlankMonthListItem";
import { StyledPlankSectionContainer } from "./style";

const PlankMonthList = () => {

  const [data1, setData1] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:5001/api/plank/list')
    //fetch('https://jsonplaceholder.typicode.com/photos')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData1(data);
        });
  }, []);

  return (
    <>
      {data1.map((itemData: any, index: number) => {
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
