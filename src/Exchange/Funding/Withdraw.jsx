import React, { useState } from "react";
import "./index.css";
import { assets } from "../../Components/Static";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  InformationCircleIcon,
} from "hugeicons-react";

const Withdraw = () => {
  const [assetList, setAssetList] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const toggleAssetList = () => {
    setAssetList(!assetList);
  };
  const selectAsset = (data) => {
    setSelectedAsset(data);
    toggleAssetList();
  };
  return (
    <div className="depositDiv">
      <div className="depositDiv_cont1">
        <div className="depositDiv_cont1_div1">
          <div
            className="depositDiv_cont1_div1_select_dv1"
            onClick={toggleAssetList}
          >
            <div className="depositDiv_cont1_div1_select_dvi_cont1">
              <img
                src={selectedAsset.img}
                alt=""
                className="depositDiv_cont1_div1_select_dvi_cont1_img"
              />{" "}
              {selectedAsset.tokenSymbol}
              {assetList ? (
                <ArrowUp01Icon className="depositDiv_cont1_div1_select_dvi_cont1_icon" />
              ) : (
                <ArrowDown01Icon className="depositDiv_cont1_div1_select_dvi_cont1_icon" />
              )}
            </div>
          </div>
          <input
            type="text"
            className="depositDiv_cont1_div1_input"
            placeholder="0.00"
          />

          {assetList && (
            <div className="AssetListDrop">
              <div className="AssetListDrop_title">
                <div className="AssetListDrop_title_1">Choose Asset</div>
                <div className="AssetListDrop_title_2">Available</div>
              </div>
              <div className="AssetListDrop_body">
                {assets.map((data) => (
                  <div
                    className="AssetListDropCont"
                    onClick={() => {
                      selectAsset(data);
                    }}
                  >
                    <div className="AssetListDropCont1">
                      <img
                        src={data.img}
                        alt=""
                        className="depositDiv_cont1_div1_select_dvi_cont1_img"
                      />{" "}
                      {data.tokenSymbol}
                    </div>
                    <div className="AssetListDropCont2">
                      0.00
                      <span className="AssetListDropCont2_Span">$0.00</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="depositDiv_cont1_div2">
          Max withdrawal:{" "}
          <span className="depositDiv_cont1_div2_span">1,000.00</span>
        </div>
      </div>
      <div className="depositDiv_cont2">
        <div className="depositDiv_cont2_cont1">25%</div>
        <div className="depositDiv_cont2_cont1">50%</div>
        <div className="depositDiv_cont2_cont1">75%</div>
        <div className="depositDiv_cont2_cont1">100%</div>
      </div>
      <div className="depositDiv_cont3">
        <div className="depositDiv_cont3_title">Summary</div>
        <div className="depositDiv_cont3_body">
          <div className="depositDiv_cont3_body_cont">
            <div className="depositDiv_cont3_body_cont_1">Balance</div>
            <div className="depositDiv_cont3_body_cont_2">
              0.00
              <span className="depositDiv_cont3_body_cont_2_span">
                {" "}
                {selectedAsset.tokenSymbol}
              </span>
            </div>
          </div>
          <div className="depositDiv_cont3_body_cont">
            <div className="depositDiv_cont3_body_cont_1">Account Value</div>
            <div className="depositDiv_cont3_body_cont_2">$0.00</div>
          </div>
        </div>
      </div>
      <button className="depositDiv_cont4_btn">Withdraw</button>
    </div>
  );
};

export default Withdraw;
