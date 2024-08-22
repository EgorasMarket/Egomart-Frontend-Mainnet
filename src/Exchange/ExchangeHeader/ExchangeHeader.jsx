import React from "react";
import "./index.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const ExchangeHeader = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();

  return (
    <div className="exchangeHeader">
      <div className="container_fluid">
        <div className="exchangeHeader_area">
          <div className="exchangeHeader_div1">
            <img
              src="/img/vertex_logo.svg"
              alt=""
              className="exchangeHeader_div1_img"
            />
            <div className="exchangeHeader_div1_links">
              <div className="exchangeHeader_div1_links_tab1">Portfolio</div>
              <div className="exchangeHeader_div1_links_tab1">Trade</div>
              <div className="exchangeHeader_div1_links_tab1">Earn</div>
              <div className="exchangeHeader_div1_links_tab1">Markets</div>
              <div className="exchangeHeader_div1_links_tab1">More </div>
            </div>
          </div>
          <div className="exchangeHeader_div2">
            <w3m-button />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeHeader;
