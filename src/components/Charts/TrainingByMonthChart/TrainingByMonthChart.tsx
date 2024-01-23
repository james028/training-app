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

const TrainingByMonthChart = ({ data }: { data: Record<any, any> }) => {
  const createDatasetsData = () => {
    const backgroundColors = [
      "rgb(255, 99, 132)",
      "rgb(75, 192, 192)",
      "rgb(53, 162, 235)",
    ];

    const firstKey = Object.keys(data)[0];

    return Object.keys(data[firstKey]).reduce((acc, label, index) => {
      const newData: {
        data: number[];
        label: string;
        backgroundColor: string;
      } = {
        label,
        data: Object.keys(data).map((key) => +data[key][label]),
        backgroundColor: backgroundColors[index],
      };
      // @ts-ignore
      acc.push(newData);
      return acc;
    }, []);
  };

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

  console.log(createDatasetsData());

  const chartData = {
    labels: months,
    datasets: createDatasetsData(),
  };

  return <Bar options={options} data={chartData} />;
};

export default TrainingByMonthChart;
