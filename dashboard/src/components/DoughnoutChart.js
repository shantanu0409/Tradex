import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Doughnut,
} from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

// Chart Options
const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#555",
        padding: 16,
        boxWidth: 14,
        font: {
          size: 12,
        },
      },
    },

    tooltip: {
      backgroundColor:
        "#ffffff",
      titleColor: "#222",
      bodyColor: "#333",
      borderColor:
        "#e5e7eb",
      borderWidth: 1,
    },
  },

  cutout: "70%",
};

// Component
export function DoughnutChart({
  data,
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "280px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}