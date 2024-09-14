import React, { useState, useEffect } from "react";
import "./bond.css";
import {
  Cancel01Icon,
  Link03Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import { useSelector } from "react-redux";
// import ComponentLoaderLogin from "../../../Components/ComponentLoaderLogin/ComponentLoaderLogin";
// import ErrorModal from "../../../Components/SuccessErrorModals/ErrorModal";
// import SuccessModal from "../../../Components/SuccessErrorModals/SuccessModal";
import { useNavigate } from "react-router-dom";
import { Wallet02Icon } from "hugeicons-react";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";

const Bond = () => {
  const [amount, setAmount] = useState("");
  const [egodAmount, setEgodAmount] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const bond = async () => {
    console.log("bonding...");
  };

  const changeAmount = (e) => {
    setAmount(e.target.value);
    setEgodAmount(parseFloat(e.target.value) * Number(1000));
  };

  const changeEgodAmount = (e) => {
    setEgodAmount(e.target.value);
    setAmount(parseFloat(e.target.value) / Number(1000));
  };

  return (
    <div className="bond_comp">
      <div className="bond_comp_title">Bond Egax</div>
      <div className="container">
        <div className="bond_body">
          <div className="bond_body_div1">
            <div className="bond_body_div1_cont1">
              <img
                src="/img/egax_logo.png"
                alt=""
                className="bond_body_div1_cont1_img"
              />
              EGAX
            </div>
            <div className="bond_body_div1_cont2">
              <div className="bond_body_div1_cont1_title">
                You Burn{" "}
                <div className="bond_body_div1_cont1_title_balance">
                  {" "}
                  <span style={{ marginRight: "3px", display: "flex" }}>
                    <Wallet02Icon size={12} /> :{" "}
                  </span>
                  {numberWithCommas(parseFloat(1000).toFixed(4))}
                </div>
              </div>
              {/* <div className="bond_body_div1_cont1_amount">100,000</div> */}
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                className="bond_body_div1_cont1_amount"
                value={amount}
                onChange={changeAmount}
              />
            </div>
          </div>
          <div className="bond_body_div2">
            <div className="bond_body_div2_cont1">
              <img
                src="/img/bond_icon1.svg"
                alt=""
                className="bond_body_div2_cont1_img"
              />
              <div className="bond_body_div2_cont1_txt">1EGAX = {10}EGOD</div>
            </div>
            <div className="bond_body_div2_cont1">
              <img
                src="/img/bond_icon1.svg"
                alt=""
                className="bond_body_div2_cont1_img"
              />
              <div className="bond_body_div2_cont1_txt">1EGOD = $1.00</div>
            </div>
            {/* <div className="bond_body_div2_cont1">
            <img
              src="/img/bond_icon2.svg"
              alt=""
              className="bond_body_div2_cont1_img"
            />
            <div className="bond_body_div2_cont1_txt">Fee = $0.00</div>
          </div> */}
            <div className="bond_body_div2_cont1">
              <img
                src="/img/bond_icon3.svg"
                alt=""
                className="bond_body_div2_cont1_img"
              />
              <div className="bond_body_div2_cont1_txt">Instant</div>
            </div>
          </div>
          <div className="bond_body_div1">
            <div className="bond_body_div1_cont1">
              <img
                src="/egomart_logo.png"
                alt=""
                className="bond_body_div1_cont1_img"
              />
              EGOD
            </div>
            <div className="bond_body_div1_cont2">
              <div className="bond_body_div1_cont1_title">
                You Mint{" "}
                <div className="bond_body_div1_cont1_title_balance">
                  {" "}
                  <span style={{ marginRight: "3px", display: "flex" }}>
                    <Wallet02Icon size={12} /> :{" "}
                  </span>
                  {numberWithCommas(parseFloat(1000).toFixed(4))}
                </div>
              </div>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                className="bond_body_div1_cont1_amount"
                onChange={changeEgodAmount}
                value={egodAmount}
              />
            </div>
          </div>
          <div className="detail_div">
            <div className="TokenListDetailBody_warning_div">
              <InformationCircleIcon size={15} />
              <div className="TokenListDetailBody_warning_div_span">
                Your EGAX will be <b> burnt </b> and the equivalent will be
                minted in EGOD and sent to your wallet.
              </div>
            </div>
          </div>
          <button className="bond_btn" onClick={bond}>
            Bond
          </button>
        </div>
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* {loading && <ComponentLoaderLogin text={"Bonding"} />}
      <SuccessModal
        isOpen={success}
        text={
          "Your egax has been bonded successfully and your EGOD has been minted."
        }
        onClose={() => {
          navigate("/app/wallet");
        }}
      />
      <ErrorModal
        isOpen={error}
        text={"Oops something went wrong, please try again"}
        onClose={() => {
          setError(false);
        }}
      /> */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
    </div>
  );
};

export default Bond;
