import React, { useState, useEffect } from "react";
import "./newFooter.css";

const NewFooter = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="newFooterDiv">
      <div className="container">
        <div className="newFooterDiv_area">
          <div className="newFooterDiv_area_1">
            <div className="newFooterDiv_area_1_cont1">
              <div className="newFooterDiv_area_1_cont1_title">Company</div>
              <div className="newFooterDiv_area_1_cont1_body">
                <a
                  href="/about"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  About us{" "}
                </a>
                <a
                  href="https://egochain.org/whitepaper"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Whitepaper
                </a>
                <a
                  href="https://docs.egochain.org/resources/brand-assets"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Press & Media Kits
                </a>
                <a
                  href="https://egoras.com"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Egoras Foundation
                </a>
                <a
                  href="mailto:support@egoras.com"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Contact us
                </a>
                <a href="#faq" className="newFooterDiv_area_1_cont1_body_link">
                  FAQ
                </a>
              </div>
            </div>
            <div className="newFooterDiv_area_1_cont1">
              <div className="newFooterDiv_area_1_cont1_title">Products</div>
              <div className="newFooterDiv_area_1_cont1_body">
                <a
                  href="https://t.me/egomartbot"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Egomart
                </a>
                <a
                  href="https://egochain.org/farm"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  EGAX staking
                </a>
                <a
                  href="https://t.me/egomartbot"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  EgoUSD minting
                </a>
                <a
                  href="https://egoswap.io"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Egoswap
                </a>
                {/* <a href="#" className="newFooterDiv_area_1_cont1_body_link">
                  EgochainDAO
                </a> */}
              </div>
            </div>
            <div className="newFooterDiv_area_1_cont1">
              <div className="newFooterDiv_area_1_cont1_title">Developers</div>
              <div className="newFooterDiv_area_1_cont1_body">
                <a
                  href="https://docs.egochain.org/"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Knowledge base
                </a>
                <a
                  href={
                    window.location.protocol === "http:"
                      ? `http://faucet.localhost:${window.location.port}/`
                      : `https://faucet.egochain.org/`
                  }
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Faucet
                </a>
                {/* <a href="#" className="newFooterDiv_area_1_cont1_body_link">
                  Developer forum
                </a> */}
              </div>
            </div>
            <div className="newFooterDiv_area_1_cont1">
              <div className="newFooterDiv_area_1_cont1_title">Resources</div>
              <div className="newFooterDiv_area_1_cont1_body">
                {/* <a href="#" className="newFooterDiv_area_1_cont1_body_link">
                  Ecosystem
                </a> */}
                <a
                  href="https://docs.egochain.org/"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  How it works
                </a>
                <a
                  href="https://egoscan.io/"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Block Explorer
                </a>
                <a
                  href="https://egoswap.io"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Bridge
                </a>
                <a
                  href="https://github.com/EgorasMarket"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Github
                </a>
                <a
                  href="https://docs.egochain.org/"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Documentation
                </a>
                <a
                  href="https://egoras.medium.com/"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Medium
                </a>
                <a
                  href="https://egochain.org/audit.pdf"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Audit
                </a>
                <a
                  href="https://egochain.org/about"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Roadmap
                </a>
                <a
                  href="https://www.coingecko.com/en/coins/egochain"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Coingecko
                </a>
                <a
                  href="https://coinmarketcap.com/currencies/egochain/"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Coinmarketcap
                </a>
              </div>
            </div>
            <div className="newFooterDiv_area_1_cont1">
              <div className="newFooterDiv_area_1_cont1_title">Community</div>
              <div className="newFooterDiv_area_1_cont1_body">
                <a
                  href="https://twitter.com/egochainhq"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Twitter
                </a>
                <a
                  href="https://ng.linkedin.com/company/egorashq"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/egorasmarket/"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Facebook
                </a>
                <a
                  href="https://github.com/EgorasMarket"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Github
                </a>
                {/* <a href="#" className="newFooterDiv_area_1_cont1_body_link">
                  Discord
                </a> */}
                <a
                  href="https://arena.social/egochainHQ"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  TheArenaApp
                </a>
                <a
                  href="https://www.youtube.com/channel/UCxmnm9mRbjC_oB9qxyMHYEg"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Youtube
                </a>
                <a
                  href="https://t.me/egochainHQ"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Telegram
                </a>
              </div>
            </div>
            <div className="newFooterDiv_area_1_cont1">
              <div className="newFooterDiv_area_1_cont1_title">Legal</div>
              <div className="newFooterDiv_area_1_cont1_body">
                <a
                  href="https://egochain.org/terms"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Terms
                </a>
                <a
                  href="https://egochain.org/privacy"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Privacy
                </a>
                {/* <a href="#" className="newFooterDiv_area_1_cont1_body_link">
                  Cookies
                </a> */}
                <a
                  href="https://egochain.org/audit.pdf"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Licenses
                </a>
                {/* <a href="#" className="newFooterDiv_area_1_cont1_body_link">
                  Settings
                </a> */}
                <a
                  href="mailto:support@egoras.com"
                  target="_blank"
                  className="newFooterDiv_area_1_cont1_body_link"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
          <div className="newFooterDiv_area_2">
            <div className="newFooterDiv_area_2_area">
              <div className="newFooterDiv_area_2_area1">
                <div className="footerDiv1_area1_cont1">
                  <img
                    src="/img/egax_logo.png"
                    alt=""
                    className="footerDiv1_img2"
                  />
                  Egochain
                </div>
              </div>
              <div className="newFooterDiv_area_2_area2">
                © {currentYear} Egochain. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
