import React, {
  useEffect,
  useRef,
} from "react";
import {
  createChart,
} from "lightweight-charts";

const StockChart = ({
  data = [],
}) => {
  const chartContainerRef =
    useRef(null);

  useEffect(() => {
    // Don't create chart if container is missing
    if (
      !chartContainerRef.current
    ) {
      return;
    }

    // Get responsive width
    const containerWidth =
      chartContainerRef.current
        .clientWidth || 900;

    // Create chart
    const chart =
      createChart(
        chartContainerRef.current,
        {
          width:
            containerWidth,
          height: 420,

          // Dark theme
          layout: {
            background: {
              color:
                "#0f172a",
            },
            textColor:
              "#e5e7eb",
          },

          // Grid lines
          grid: {
            vertLines: {
              color:
                "#1e293b",
            },
            horzLines: {
              color:
                "#1e293b",
            },
          },

          // Price scale
          rightPriceScale: {
            borderColor:
              "#334155",
          },

          // Time scale
          timeScale: {
            borderColor:
              "#334155",
            timeVisible:
              true,
            secondsVisible:
              false,
          },

          // Crosshair
          crosshair: {
            vertLine: {
              color:
                "#475569",
            },
            horzLine: {
              color:
                "#475569",
            },
          },
        }
      );

    // Candlestick series
    const candleSeries =
      chart.addCandlestickSeries(
        {
          upColor:
            "#22c55e",
          downColor:
            "#ef4444",
          borderVisible:
            false,
          wickUpColor:
            "#22c55e",
          wickDownColor:
            "#ef4444",
        }
      );

    // Set chart data
    if (
      data &&
      data.length > 0
    ) {
      candleSeries.setData(
        data
      );
      chart
        .timeScale()
        .fitContent();
    }

    // Handle window resize
    const handleResize =
      () => {
        if (
          chartContainerRef.current
        ) {
          chart.applyOptions(
            {
              width:
                chartContainerRef.current
                  .clientWidth,
            }
          );
        }
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
      chart.remove();
    };
  }, [data]);

  // Empty state
  if (
    !data ||
    data.length === 0
  ) {
    return (
      <div
        style={{
          background:
            "#0f172a",
          border:
            "1px solid #1e293b",
          borderRadius:
            "16px",
          height: "420px",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color:
            "#94a3b8",
          fontSize:
            "18px",
          marginTop: "20px",
          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.25)",
        }}
      >
        No chart data available
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "#0f172a",
        border:
          "1px solid #1e293b",
        borderRadius:
          "16px",
        padding: "10px",
        marginTop: "20px",
        boxShadow:
          "0 10px 30px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        ref={
          chartContainerRef
        }
        style={{
          width: "100%",
          height: "420px",
        }}
      />
    </div>
  );
};

export default StockChart;