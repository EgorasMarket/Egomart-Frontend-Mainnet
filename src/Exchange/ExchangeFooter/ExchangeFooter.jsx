import React, { useState, useEffect } from "react";
import "./index.css";
import { TelegramIcon, CustomerSupportIcon } from "hugeicons-react";

const ExchangeFooter = () => {
  const [latency, setLatency] = useState(null);
  const [networkStatus, setNetworkStatus] = useState("Checking...");

  // Function to measure the latency
  const checkLatency = async () => {
    const startTime = Date.now();

    try {
      // Ping your server or a fast, reliable endpoint like Google's
      await fetch("8.8.8.8"); // Use your domain
      // await fetch("https://www.fronttest.egomart.org/"); // Use your domain
      const endTime = Date.now();

      const latencyTime = endTime - startTime;
      setLatency(latencyTime);

      // Set network status based on latency
      if (latencyTime >= 200) {
        setNetworkStatus("Poor Network");
      } else {
        setNetworkStatus("Good Network");
      }
    } catch (error) {
      console.error("Latency check failed:", error);
      setNetworkStatus("Error checking latency");
    }
  };

  useEffect(() => {
    // Check the latency when the page loads
    checkLatency();

    // Check the latency every 5 seconds
    const intervalId = setInterval(() => {
      checkLatency();
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="ExchangeFooter">
      <div className="container_fluid">
        <div className="ExchangeFooter_area">
          <div className="ExchangeFooter_area_1">
            <CustomerSupportIcon className="ExchangeFooter_area_1_icon" /> Need
            Help?
          </div>
          <div className="ExchangeFooter_area_2">
            Latency
            <span className="latency_icon">
              {networkStatus == "Good Network" ? (
                <>
                  <svg
                    stroke="#3df57b"
                    fill="#3df57b"
                    stroke-width="0"
                    viewBox="0 0 256 256"
                    class="text-positive"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M168,72V200a8,8,0,0,1-16,0V72a8,8,0,0,1,16,0Zm32-48a8,8,0,0,0-8,8V200a8,8,0,0,0,16,0V32A8,8,0,0,0,200,24Zm-80,80a8,8,0,0,0-8,8v88a8,8,0,0,0,16,0V112A8,8,0,0,0,120,104ZM80,144a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V152A8,8,0,0,0,80,144ZM40,184a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,40,184Z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    stroke="#ff3f3f"
                    fill="#ff3f3f"
                    stroke-width="0"
                    viewBox="0 0 256 256"
                    class="text-warning"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M128,112v88a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM80,144a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V152A8,8,0,0,0,80,144ZM40,184a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,40,184Z"></path>
                  </svg>
                </>
              )}
            </span>
            <span className="ms_span"> {latency} ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeFooter;
