import React, { useEffect, useRef } from "react";
import "./index.css";

const TradingChart = () => {
  const container = useRef();
  const scriptAppended = useRef(false);

  useEffect(() => {
    if (!scriptAppended.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
       "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "backgroundColor": "#151e1b",
          "borderColor":"#fff",
          "hide_top_toolbar": false,
          "toolbar_bg":"#fff",
          "allow_symbol_change": false,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
      scriptAppended.current = true;
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      //
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export default TradingChart;
