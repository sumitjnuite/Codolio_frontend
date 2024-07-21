import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ chartData }) => {
  return <Pie className="flex-1" height={200} data={chartData} options={{ maintainAspectRatio: false }} />;
};

export default PieChart;
