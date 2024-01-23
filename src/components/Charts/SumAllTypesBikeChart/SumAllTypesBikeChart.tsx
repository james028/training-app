import React from "react";
import { Doughnut } from "react-chartjs-2";

const SumAllTypesBikeChart = ({ data }: { data: Record<string, number> }) => {
  //potem dodać kolory
  const chartData = {
    labels: [...Object.keys(data)].map(
      //potem to na enuma
      (type) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
    ),
    datasets: [
      {
        //tłumaczenie
        label: "Liczba treningów tym rowerem",
        data: [...Object.values(data)],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default SumAllTypesBikeChart;
