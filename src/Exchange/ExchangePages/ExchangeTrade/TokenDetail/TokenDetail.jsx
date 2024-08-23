import React from "react";
import "./index.css";
import { ArrowDown01Icon, LinkCircle02Icon } from "hugeicons-react";

const TokenDetail = ({ payload }) => {
  return (
    <div className="tokenDetailDiv">
      <div className="tokenDetailDiv_cont1">
        <div className="tokenDetailDiv_cont1_title">
          <img src={payload?.img} alt="" className="tokenDetailDiv_cont1_img" />
          {payload?.pair.split("-")[0]}
        </div>
        <div className="tokenDetailDiv_cont1_txt">{payload?.meta?.details}</div>
        <div className="tokenDetailDiv_cont1_links">
          <div
            className="tokenDetailDiv_cont1_links_link1"
            onClick={() => {
              window.location.href = payload?.meta?.website;
            }}
          >
            Website
            <LinkCircle02Icon className="tokenDetailDiv_cont1_links_link1_icon" />
          </div>
          <div
            className="tokenDetailDiv_cont1_links_link2"
            onClick={() => {
              window.location.href = payload?.meta?.website;
            }}
          >
            CoinmarketCap
            <LinkCircle02Icon className="tokenDetailDiv_cont1_links_link1_icon" />
          </div>
        </div>
      </div>
      <div className="tokenDetailDiv_cont2">
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1">Market Name</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">
            {payload?.pair}
          </div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1">Type</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">
            {payload?.meta?.type}
          </div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1 info">Tick Size</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">
            {payload?.meta?.tick_size}
          </div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1 info">Step Size</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">
            {`${payload?.meta?.step_size} `}
            <span className="tokenDetailDiv_cont2_stat_cont_2_span">
              {payload?.pair.split("-")[1]}
            </span>
          </div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont_last">
          <div className="tokenDetailDiv_cont2_stat_cont_1 info">
            Minimum Order Size
          </div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">
            {`${payload?.meta?.minimum_order_size} `}

            <span className="tokenDetailDiv_cont2_stat_cont_2_span">
              {payload?.pair.split("-")[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;
