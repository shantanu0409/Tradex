import React, {
  useEffect,
  useRef,
} from "react";

const AnalyticsModal = ({
  symbol,
  onClose,
}) => {
  const container =
    useRef(null);

  // Load TradingView Widget
  useEffect(() => {
    if (!container.current)
      return;

    // Clear previous widget
    container.current.innerHTML =
      "";

    const script =
      document.createElement(
        "script"
      );

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.async = true;
    script.type =
      "text/javascript";

    script.innerHTML = JSON.stringify({
  autosize: true,
  symbol: `${symbol}`,
  interval: "D",
  timezone: "Asia/Kolkata",
  theme: "light",
  style: "1",
  locale: "en",
  hide_top_toolbar: false,
  allow_symbol_change: true,
  save_image: true,
  studies: [],
  support_host: "https://www.tradingview.com",
});
    container.current.appendChild(
      script
    );

    // Cleanup
    return () => {
      if (
        container.current
      ) {
        container.current.innerHTML =
          "";
      }
    };
  }, [symbol]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          "Escape"
        ) {
          onClose();
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0, 0, 0, 0.35)",
        zIndex: 9999,
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          width: "95%",
          height: "90%",
          background:
            "#ffffff",
          borderRadius:
            "8px",
          overflow:
            "hidden",
          position:
            "relative",
          border:
            "1px solid #e5e7eb",
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            padding:
              "14px 20px",
            borderBottom:
              "1px solid #e5e7eb",
            background:
              "#ffffff",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize:
                "22px",
              fontWeight:
                "600",
              color: "#222",
            }}
          >
            {symbol} Analytics
          </h2>

          <button
            onClick={onClose}
            style={{
              background:
                "#ef4444",
              color: "white",
              border:
                "none",
              padding:
                "8px 14px",
              borderRadius:
                "4px",
              cursor:
                "pointer",
              fontWeight:
                "500",
              fontSize:
                "14px",
            }}
          >
            Close
          </button>
        </div>

        {/* TradingView Widget */}
        <div
          className="tradingview-widget-container"
          style={{
            height:
              "calc(100% - 60px)",
            width: "100%",
            background:
              "#ffffff",
          }}
        >
          <div
            ref={container}
            className="tradingview-widget-container__widget"
            style={{
              height:
                "100%",
              width:
                "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;