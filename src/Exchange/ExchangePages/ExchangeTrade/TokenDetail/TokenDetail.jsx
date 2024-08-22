import React from "react";
import "./index.css";
import { ArrowDown01Icon, LinkCircle02Icon } from "hugeicons-react";

const TokenDetail = () => {
  return (
    <div className="tokenDetailDiv">
      <div className="tokenDetailDiv_cont1">
        <div className="tokenDetailDiv_cont1_title">
          <img
            src="/img/egax_logo.png"
            alt=""
            className="tokenDetailDiv_cont1_img"
          />
          Egax
        </div>
        <div className="tokenDetailDiv_cont1_txt">
          Bitcoin is a decentralized digital currency, without a central bank or
          single administrator that can be sent from user to user on the
          peer-to-peer bitcoin network without the need for intermediaries.
        </div>
        <div className="tokenDetailDiv_cont1_links">
          <div className="tokenDetailDiv_cont1_links_link1">
            Website{" "}
            <LinkCircle02Icon className="tokenDetailDiv_cont1_links_link1_icon" />
          </div>
          <div className="tokenDetailDiv_cont1_links_link2">
            CoinmarketCap{" "}
            <LinkCircle02Icon className="tokenDetailDiv_cont1_links_link1_icon" />
          </div>
        </div>
      </div>
      <div className="tokenDetailDiv_cont2">
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1">Market Name</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">EGAX-EGOD</div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1">Type</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">Spot</div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1 info">Tick Size</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">$5</div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont">
          <div className="tokenDetailDiv_cont2_stat_cont_1 info">Step Size</div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">
            2.00{" "}
            <span className="tokenDetailDiv_cont2_stat_cont_2_span">EGAX</span>
          </div>
        </div>
        <div className="tokenDetailDiv_cont2_stat_cont_last">
          <div className="tokenDetailDiv_cont2_stat_cont_1 info">
            Minimum Order Size
          </div>
          <div className="tokenDetailDiv_cont2_stat_cont_2">
            2.00{" "}
            <span className="tokenDetailDiv_cont2_stat_cont_2_span">EGAX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;
