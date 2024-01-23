import React from "react";
import SumByMonthsChart from "./SumByMonthsChart/SumByMonthsChart";
import { countTotalNestedEventsPerMonth } from "../../hooks/useCountTotalEventsPerMonth";
import { calendarData } from "../../mock/mock";
import SumAllTrainingsChart from "./SumAllTrainingsChart/SumAllTrainingsChart";
import { countNestedEventsByType } from "../../hooks/useCountEventByType";
import TrainingByMonthChart from "./TrainingByMonthChart/TrainingByMonthChart";

const Charts = () => {
  const { resultsArray } = countTotalNestedEventsPerMonth(calendarData);
  const { resultsEventArray, resultByMonthIndex, result } =
    countNestedEventsByType(calendarData);

  console.log(resultsEventArray, resultByMonthIndex, result);
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1 gap-10 pb-20">
        <div>
          <SumByMonthsChart data={resultsArray} />
        </div>
        <div>
          <SumAllTrainingsChart data={result} />
        </div>
        <div>
          <TrainingByMonthChart data1={resultByMonthIndex} />
        </div>
        <div>
          <SumByMonthsChart data={resultsArray} />
        </div>
      </div>
    </>
  );
};

export default Charts;
