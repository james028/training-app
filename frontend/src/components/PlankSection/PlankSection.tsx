import React from "react";
import AddEditPlankTraining from "./AddEditPlankTraining/AddEditPlankTraining";
import PlankSectionWrapper from "./PlankSectionWrapper/PlankSectionWrapper";
import PlankMonthList from "./PlankMonthList/PlankMonthList";
import PlankMonthList2 from "./PlankMonthList/PlankMonthList2";
import OptimizedSearch from "./PlankMonthList/PlankMonthList2";

const PlankSection = () => {
  return (
    <div>
      Plank Section
      <PlankSectionWrapper>
        <div>
          {/*<AddEditPlankTraining />*/}
          <PlankMonthList />
          {/*<OptimizedSearch />*/}
        </div>
      </PlankSectionWrapper>
    </div>
  );
};

export default PlankSection;
