import React from "react";
import { DateTime } from "luxon";
import PlankMonthList from "./PlankMonthList/PlankMonthList";

const PlankSection = () => {
  // console.log(sumMinutes(seconds)); //'00:12'
  // console.log(sumMinutes(mins)); //'02:43'
  // console.log(sumMinutes(hours)); //'02:09:00'
  //console.log(sumMinutes(mix)); //'14:58'

  //sumMinutes(mix);
  return (
    <div>
      Plank Section
      <PlankMonthList />
    </div>
  );
};

export default PlankSection;
