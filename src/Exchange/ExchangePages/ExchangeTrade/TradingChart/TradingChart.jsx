import React, { useEffect, useRef } from "react";
import "./index.css";

const TradingChart = () => {
  const container = useRef(null);
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

  // useEffect(() => {
  //   // Function to load the TradingView script
  //   const loadTradingViewScript = () => {
  //     const script = document.createElement("script");
  //     script.src = "https://s3.tradingview.com/tv.js";
  //     script.async = true;
  //     script.onload = () => initTradingViewWidget(); // Initialize widget after script is loaded
  //     document.body.appendChild(script);
  //   };

  //   // Function to initialize the TradingView widget
  //   const initTradingViewWidget = () => {
  //     if (window.TradingView) {
  //       new window.TradingView.widget({
  //         symbol: "BTCUSD", // Custom symbol
  //         datafeed: {
  //           onReady: (cb) => {
  //             cb({
  //               supported_resolutions: ["1", "5", "15", "30", "60", "D"],
  //             });
  //           },
  //           resolveSymbol: (
  //             symbolName,
  //             onSymbolResolvedCallback,
  //             onResolveErrorCallback
  //           ) => {
  //             // Properly resolving the custom symbol
  //             onSymbolResolvedCallback({
  //               ticker: symbolName, // "COINGECKO:BTCUSD"
  //               name: "BTC/USD",
  //               type: "crypto",
  //               session: "24x7",
  //               timezone: "Etc/UTC",
  //               exchange: "CoinGecko",
  //               minmov: 1, // Minimum movement, typically 1 for crypto
  //               pricescale: 100, // 100 means 2 decimal places, adjust based on the precision you need
  //               has_intraday: true,
  //               supported_resolutions: ["1", "5", "15", "30", "60", "D"],
  //               has_seconds: false,
  //               volume_precision: 2,
  //               data_status: "streaming", // Custom data feed is treated as 'streaming'
  //             });
  //           },
  //           getBars: (
  //             symbolInfo,
  //             resolution,
  //             from,
  //             to,
  //             onHistoryCallback,
  //             onErrorCallback,
  //             firstDataRequest
  //           ) => {
  //             fetch(
  //               `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`
  //             )
  //               .then((response) => response.json())
  //               .then((data) => {
  //                 const bars = data.prices.map((priceData, index) => ({
  //                   time: priceData[0], // Unix timestamp in milliseconds
  //                   open: priceData[1], // Since CoinGecko doesn't provide OHLC, using price as open, high, low, close
  //                   high: priceData[1],
  //                   low: priceData[1],
  //                   close: priceData[1],
  //                   volume: data.total_volumes[index][1], // Volume from CoinGecko
  //                 }));

  //                 onHistoryCallback(bars, { noData: bars.length === 0 });
  //               })
  //               .catch(onErrorCallback);
  //           },
  //         },
  //         container_id: "tradingview-widget-container",
  //         width: "100%",
  //         height: "100%",
  //       });
  //     }
  //   };

  //   // Check if TradingView script is already loaded
  //   if (!window.TradingView) {
  //     loadTradingViewScript();
  //   } else {
  //     initTradingViewWidget();
  //   }
  // }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      //
      style={{ height: "100%", width: "100%" }}
    ></div>
    // <div
    //   id="tradingview-widget-container"
    //   ref={containerRef}
    //   style={{ height: "100%", width: "100%" }}
    // ></div>
  );
};

export default TradingChart;
