import React from "react";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS, registerables } from "chart.js";
import { useTranslation } from "react-i18next";
import { TRANSLATED_MONTHS } from "../../../constants";
ChartJS.register(...registerables);

type TSumByMonthsChart = {
  data: number[];
};
const SumByMonthsChart = ({ data }: TSumByMonthsChart) => {
  const { t } = useTranslation();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const chartData = {
    labels: TRANSLATED_MONTHS,
    datasets: [
      {
        label: t("CountOfTrainingsByMonths"),
        data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
};

export default SumByMonthsChart;
