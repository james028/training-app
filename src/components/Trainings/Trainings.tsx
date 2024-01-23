import React from "react";
import Calendar from "../Calendar/Calendar";
import Charts from "../Charts/Charts";

const Trainings = () => {
  return (
    <React.Fragment>
      <div className="antialiased sans-serif bg-gray-100">
        <Calendar />
      </div>
      <div className="container mx-auto px-4 py-2 md:py-24">
        <Charts />
      </div>
    </React.Fragment>
  );
};

export default Trainings;
