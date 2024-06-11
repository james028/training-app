import React from "react";
import { Bar } from "react-chartjs-2";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { months } from "../../../utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const TrainingByMonthChart = ({
  data,
  trainingTypes,
}: {
  data: Record<any, any>;
  trainingTypes: any;
}) => {
  console.log(trainingTypes, "trainingTypes");

  //tu dokończyć
  const createDatasetsData = () => {
    const backgroundColors = [
      "rgb(255, 99, 132)",
      "rgb(75, 192, 192)",
      "rgb(53, 162, 235)",
      "rgb(53, 262, 135)",
    ];

    const firstKey = Object.keys(data)[0];
    console.log(firstKey, "Object.keys(data) key");

    return [...Object.keys(trainingTypes)].reduce((acc: any, label, index) => {
      const newData: {
        data: (number | null)[];
        label: any;
        backgroundColor: string;
      } = {
        label,

        //tutaj zrobić poprawnie
        // data: Object.keys(data).map((key) => {
        //   if (data[key][label]) {
        //     return +data[key][label];
        //   } else {
        //     return null;
        //   }
        // }),
        data: Object.keys(data).map((key) => +data[key][label]),
        backgroundColor: backgroundColors[index],
      };

      // @ts-ignore
      acc.push(newData);
      return acc;
    }, []);
  };

  console.log(createDatasetsData());

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  console.log(createDatasetsData(), "333");

  const chartData = {
    labels: months,
    datasets: createDatasetsData(),
  };

  return <Bar options={options} data={chartData} />;
};

export default TrainingByMonthChart;
