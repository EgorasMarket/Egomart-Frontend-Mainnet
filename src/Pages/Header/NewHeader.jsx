import React, { useState, useEffect } from "react";
import "./newHeader.css";
import { ArrowDown01Icon, ArrowUpRight01Icon } from "hugeicons-react";
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NewHeader = () => {
  const [productsDrop, setProductsDrop] = useState("");
  const [headerMenu, setHeaderMenu] = useState(false);
  const ToggleHeaderMenu = () => {
    setHeaderMenu(!headerMenu);
  };

  const toggleProductsDrop = (drop) => {
    setProductsDrop(drop);
  };
  return (
    <div className="newHeaderDiv">
      <div className="container">
        <div className="newHeaderDiv_area">
          <div className="newHeaderDiv_area1">
            <a href="/" className="newHeaderDiv_area1_link">
              <img
                src="/egomart_logo.png"
                alt=""
                className="header_div_area_1_img"
              />
              Egomart
            </a>
          </div>
          <div className="newHeaderDiv_area2">
            <div
              className="newHeaderDiv_area2_link1"
              onMouseOver={() => {
                toggleProductsDrop("products");
              }}
            >
              Products{" "}
              <ArrowDown01Icon
                className="newHeaderDiv_area2_link1_icon"
                size={18}
              />
              {productsDrop == "products" ? (
                <div
                  className="new_header_div_area_2_div_drop"
                  onMouseLeave={() => {
                    setProductsDrop("");
                  }}
                >
                  <a
                    href="https://egoswap.io"
                    target="_blank"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    Tade
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>
                  <a
                    href="/farm"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    Market
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>
                  <a
                    href="https://t.me/egomartbot"
                    target="_blank"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    Bond
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>
                  <a
                    href="https://t.me/egomartbot"
                    target="_blank"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    Portofio
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>
                </div>
              ) : null}
            </div>
            <a
              href="https://docs.egochain.org/building-on-egochain/introduction-to-egochain-development"
              target="_blank"
              className="newHeaderDiv_area2_link1"
              onMouseOver={() => {
                setProductsDrop("");
              }}
            >
              Developers{" "}
              <ArrowUpRight01Icon
                className="newHeaderDiv_area2_link1_icon"
                size={18}
              />{" "}
            </a>
            <div
              className="newHeaderDiv_area2_link1"
              onMouseOver={() => {
                toggleProductsDrop("learn");
              }}
            >
              About Us
              <ArrowDown01Icon
                className="newHeaderDiv_area2_link1_icon"
                size={18}
              />
              {productsDrop == "learn" ? (
                <div
                  className="new_header_div_area_2_div_drop"
                  onMouseLeave={() => {
                    setProductsDrop("");
                  }}
                >
                  <a
                    href="https://egoras.medium.com/"
                    target="_blank"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    Blog
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>
                  <a
                    href="https://www.egochain.org/whitepaper"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    Whitepaper
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>
                  <a
                    href="https://docs.egochain.org/egomart-overview/protocol-basics"
                    target="_blank"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    Documentation
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>

                  <a
                    href="#faq"
                    className="new_header_div_area_2_div_drop_link1"
                  >
                    {/* <InfoIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "} */}
                    FAQ
                    <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                  </a>
                </div>
              ) : null}
            </div>
            <a
              href="mailto:support@egoras.com"
              target="_blank"
              className="newHeaderDiv_area2_link1"
              onMouseOver={() => {
                setProductsDrop("");
              }}
            >
              Support{" "}
              <ArrowUpRight01Icon
                className="newHeaderDiv_area2_link1_icon"
                size={18}
              />
            </a>
          </div>
          <div className="newHeaderDiv_area3">
            <a href="https://t.me/egomartbot" target="_blank">
              <button className="newHeaderDiv_area3_btn">Trade</button>
            </a>
          </div>
          {/* <MenuIcon
            className="header_div_area_2_menu_icon"
            onClick={ToggleHeaderMenu}
          /> */}
        </div>
      </div>
      {headerMenu ? (
        <div className="headerMenuDiv">
          <div className="headerMenuDiv_cont">
            <div className="headerMenuDiv_cont_1">
              <CloseIcon
                className="headerMenuDiv_cont_1_icon"
                onClick={ToggleHeaderMenu}
              />
            </div>
            <div className="headerMenuDiv_cont_body">
              <details
                className="newHome_div_section7_area_body_accordion_body"
                open
              >
                <summary className="baccordion_title">Products</summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    <div className="mobile_nav_links_div">
                      <a
                        href="https://egoswap.io"
                        target="_blank"
                        className="mobile_nav_links_div_link"
                      >
                        Egoswap{" "}
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>
                      <a href="/farm" className="mobile_nav_links_div_link">
                        Egax Staking{" "}
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>
                      <a
                        href="https://t.me/egomartbot"
                        target="_blank"
                        className="mobile_nav_links_div_link"
                      >
                        egoUSD minting{" "}
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>
                      <a
                        href="https://t.me/egomartbot"
                        target="_blank"
                        className="mobile_nav_links_div_link"
                      >
                        egoUSD staking{" "}
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </details>

              <a
                href="https://docs.egochain.org/building-on-egochain/introduction-to-egochain-development"
                target="_blank"
                className="headerMenuDiv_cont_body_link1"
              >
                {" "}
                Developer
                <ArrowUpRight01Icon className="header_div_area_2_link1_icon" />
              </a>
              <details
                className="newHome_div_section7_area_body_accordion_body"
                open
              >
                <summary className="baccordion_title">Learn More</summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    <div className="mobile_nav_links_div">
                      <a
                        href="https://egoras.medium.com/"
                        target="_blank"
                        className="mobile_nav_links_div_link"
                      >
                        Blog
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>
                      <a
                        href="/whitepaper"
                        className="mobile_nav_links_div_link"
                      >
                        Whitepaper
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>
                      <a
                        href="/https://docs.egochain.org/"
                        target="_blank"
                        className="mobile_nav_links_div_link"
                      >
                        Documentation
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>

                      <a href="#faq" className="mobile_nav_links_div_link">
                        FAQ
                        <ArrowForwardIosIcon className="new_header_div_area_2_div_drop_link1_icon" />{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </details>
              <a
                href="mailto:support@egoras.com"
                target="_blank"
                className="headerMenuDiv_cont_body_link1"
              >
                {" "}
                Support
                <ArrowUpRight01Icon className="header_div_area_2_link1_icon" />
              </a>
              <a
                href="https://t.me/egomartbot"
                target="_blank"
                style={{ width: "100%", marginTop: "auto" }}
              >
                <button className="Airdrop_head_btn_mobile">
                  Launch Egomart
                </button>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewHeader;
