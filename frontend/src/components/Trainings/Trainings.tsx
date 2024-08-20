import React from "react";
import Calendar from "../Calendar/Calendar";
import Charts from "../Charts/Charts";
import PlankSection from "../PlankSection/PlankSection";
import TrainingsType from "../TrainingsType/TrainingsType";

const Trainings = () => {
  return (
    <React.Fragment>
      <div className="antialiased sans-serif bg-gray-100">
        <Calendar />
      </div>
      {/*<div className="container mx-auto px-4 py-2 md:py-12">*/}
      {/*  <Charts />*/}
      {/*</div>*/}
      <div className="container mx-auto px-4 py-2 md:py-12">
        <TrainingsType />
      </div>
      <div className="container mx-auto px-4 py-2 md:py-12">
        <PlankSection />
      </div>
    </React.Fragment>
  );
};

export default Trainings;
