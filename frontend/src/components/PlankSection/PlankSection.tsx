import React from "react";
import AddEditPlankTraining from "./AddEditPlankTraining/AddEditPlankTraining";
import PlankSectionWrapper from "./PlankSectionWrapper/PlankSectionWrapper";
import PlankMonthList from "./PlankMonthList/PlankMonthList";

const PlankSection = () => {
  return (
    <div>
      Plank Section
      <PlankSectionWrapper>
        <div>
          {/*<AddEditPlankTraining />*/}
          <PlankMonthList />
        </div>
      </PlankSectionWrapper>
    </div>
  );
};

export default PlankSection;
