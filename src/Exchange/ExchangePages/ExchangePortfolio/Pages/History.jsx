import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAccount, useWriteContract } from "wagmi";
import { format } from "date-fns";
import { formatEther, parseEther } from "ethers";
import { GET_USER_DEPOSIT_WITHDRAW } from "../../../../services/trade.services";

const History = () => {
  const { address } = useAccount();
  const [history, setHistory] = useState([]);
  const fetchUserHistory = async () => {
    const res = await GET_USER_DEPOSIT_WITHDRAW(address);
    console.log("====================================");
    console.log(res);
    setHistory(res.data);
    console.log("====================================");
  };
  useEffect(() => {
    if (address) {
      fetchUserHistory();
      return;
    }
  }, [address]);

  return (
    <div className="OpenOrders_div">
      <div className="OpenOrders_div_area1">
        <div className="OpenOrders_div_area1_title">History</div>
        <div className="OpenOrders_div_area1_para">{history?.length}</div>
      </div>
      <div className="OpenOrders_div_area2">
        <div className="TradesDiv_head">
          <div className="TradesDiv_head_cont1">Time</div>
          <div className="TradesDiv_head_cont1">Token</div>
          <div className="TradesDiv_head_cont1">Type</div>
          <div className="TradesDiv_head_cont1">Amount</div>
          <div className="TradesDiv_head_cont1">Txn Hash</div>
          <div className="TradesDiv_head_cont1_last"></div>
        </div>
        <div className="history_body">
          {history?.map((data) => {
            function formatDate(dateString) {
              const date = new Date(dateString);

              return format(date, "MMM do, yyyy / h:mm aaa");
            }
            return (
              <a
                href={`https://egoscan.io/tx/${data?.transHash}`}
                target="_blank"
                className="TradesDiv_body_cont"
              >
                <div className="TradesDiv_body_cont1">
                  {/* Aug 1st, 2024 / 10:00 pm */}
                  {formatDate(data?.createdAt || new Date())}
                </div>
                <div className="TradesDiv_body_cont1">
                  <div className="TradesDiv_body_cont1_div_flex">
                    {/* <img
                      src={
                        data?.ticker === "EGAX-EGOD"
                          ? "/img/egax_logo.png"
                          : null
                      }
                      alt=""
                      className="TradesDiv_body_cont1_img"
                    /> */}
                    <div className="TradesDiv_body_cont1_cont">
                      <div className="TradesDiv_body_cont1_cont_div1">EGAX</div>
                      <div className="TradesDiv_body_cont1_cont_div2"></div>
                    </div>
                  </div>
                </div>
                <div className="TradesDiv_body_cont1">
                  {" "}
                  <span
                    className={
                      data.type === "DEPOSIT"
                        ? "TradesDiv_body_cont1_span_type_buy"
                        : "TradesDiv_body_cont1_span_type_sell"
                    }
                  >
                    {data.type}
                  </span>
                </div>

                <div className="TradesDiv_body_cont1">
                  <div className="TradesDiv_body_cont1_div_flex">
                    {parseFloat(data?.amount).toFixed(4)}{" "}
                  </div>
                </div>
                <div className="TradesDiv_body_cont1">
                  {`${data?.transHash.slice(0, 5)}...${data?.transHash.slice(
                    40,
                    45
                  )}`}
                </div>

                <div className="TradesDiv_body_cont1_last"></div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
