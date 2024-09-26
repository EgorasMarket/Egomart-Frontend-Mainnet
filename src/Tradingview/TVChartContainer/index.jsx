import React, { useEffect, useRef } from "react";
import { widget } from "/charting_library-master/charting_library";
import "./index.css";
import { theme } from "antd";
let paths = window.location.pathname.split("/");
function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);

  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const TVChartContainer = () => {
  const chartContainerRef = useRef();
  const defaultProps = {
    symbol: paths[paths.length - 1],
    interval: "60",
    datafeedUrl: "https://sandboxbcd.egodeo.org/tradingview",
    libraryPath: "/charting_library-master/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    // clientId: 'tradingview.com',
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  useEffect(() => {
    const widgetOptions = {
      ticker: defaultProps.symbol,
      symbol: defaultProps.symbol,
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl
      ),
      interval: defaultProps.interval,
      container: chartContainerRef.current,
      library_path: defaultProps.libraryPath,
      locale: getLanguageFromURL() || "en",
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
      ],
      enabled_features: [
        "study_templates",
        "show_spread_operators",
        "symbol_search_complete",
        "pay_attention_to_ticker_not_symbol",
      ],
      // charts_storage_url: defaultProps.chartsStorageUrl,
      // charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      // client_id: defaultProps.clientId,
      // user_id: defaultProps.userId,
      theme: "dark",
      debug: true,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, []);

  return <div ref={chartContainerRef} className={"TVChartContainer"} />;
};
