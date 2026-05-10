import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
} from "react-chartjs-2";

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Component
export function VerticalGraph({
  data,
  title = "Portfolio Holdings",
  height = "320px",
}) {
  // Empty State
  if (
    !data ||
    !data.labels ||
    data.labels.length === 0
  ) {
    return (
      <div
        style={{
          height,
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color: "#777",
          fontSize: "16px",
        }}
      >
        No data available
      </div>
    );
  }

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      // Only one dataset, so legend is unnecessary
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: title,
        color: "#222",
        font: {
          size: 16,
          weight: "600",
        },
        padding: {
          bottom: 20,
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
        callbacks: {
          label:
            function (
              context
            ) {
              return (
                "₹" +
                Number(
                  context.raw
                ).toFixed(2)
              );
            },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },

      y: {
        ticks: {
          color: "#555",
          callback:
            function (
              value
            ) {
              return (
                "₹" +
                value
              );
            },
        },
        grid: {
          color:
            "#f1f5f9",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        height,
        position:
          "relative",
      }}
    >
      <Bar
        options={options}
        data={data}
      />
    </div>
  );
}