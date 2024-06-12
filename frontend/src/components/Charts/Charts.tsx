import React from "react";
import SumByMonthsChart from "./SumByMonthsChart/SumByMonthsChart";
import { useCountTotalNestedEventsPerMonth } from "../../hooks/useCountTotalEventsPerMonth";
import { calendarData } from "../../mock/mock";
import SumAllTrainingsChart from "./SumAllTrainingsChart/SumAllTrainingsChart";
import { useCountNestedEventsByType } from "../../hooks/useCountEventByType";
import TrainingByMonthChart from "./TrainingByMonthChart/TrainingByMonthChart";
import { useCountTotalBikeType } from "../../hooks/useCountTotalBikeType";
import SumAllTypesBikeChart from "./SumAllTypesBikeChart/SumAllTypesBikeChart";

const Charts = () => {
  const { resultsArray } = useCountTotalNestedEventsPerMonth(calendarData);
  const { bikeTypeResults } = useCountTotalBikeType(calendarData);
  const { resultByMonthIndex, result } =
    useCountNestedEventsByType(calendarData);

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
          <TrainingByMonthChart
            data={resultByMonthIndex}
            trainingTypes={result}
          />
        </div>
        <div>
          <SumAllTypesBikeChart data={bikeTypeResults} />
        </div>
      </div>
    </>
  );
};

export default Charts;
