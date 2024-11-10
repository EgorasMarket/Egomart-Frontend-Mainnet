import React, { useState, useEffect, useRef } from "react";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "./chevron-down.svg";
import styles from "./styles.module.css";
import "./whitepaper.css";
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);
const WhitePaper = () => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const contentDiv = document.getElementById("content");

    const updateActiveSection = () => {
      const scrollPosition = contentDiv.scrollTop;
      const sections = document.querySelectorAll(
        ".whitePaper_div_area_body_area_section"
      );

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id");
        const sectionOffsetTop = section.offsetTop - 50;

        if (scrollPosition >= sectionOffsetTop) {
          setActiveSection(sectionId);
        }
      });
    };

    contentDiv.addEventListener("scroll", updateActiveSection);

    return () => {
      contentDiv.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <div className="whitepaper_div">
      <div className="container">
        <div className="whitePaper_div_area_body">
          <div className="whitePaper_div_area_body_side" id="sidebar">
            <div
              className={
                activeSection === "abstract"
                  ? "active"
                  : " whitePaper_div_area_body_side_list"
              }
            >
              <a href="#abstract">Abstract</a>
            </div>
            <div
              className={
                activeSection === "introduction"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#introduction">Introduction</a>
            </div>
            <div
              className={
                activeSection ===
                "The Problem: Commodities and Economic Pressure"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#The Problem: Commodities and Economic Pressure">
                The Problem: Commodities and Economic Pressure
              </a>
            </div>
            <div
              className={
                activeSection ===
                "Streamlining Manufacturing and Boosting Accessibility"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Streamlining Manufacturing and Boosting Accessibility">
                The Egomart Solution: Decentralization, Tokenization, and
                Subsidization
              </a>
            </div>
            <div
              className={
                activeSection === "Vision and Mission"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#in-mcd-we-trust">Vision and Mission</a>
            </div>
            <div
              className={
                activeSection ===
                "Charging costs & Improved charging infrastructure"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Charging costs & Improved charging infrastructure">
                Why Egomart?
              </a>
            </div>
            <div
              className={
                activeSection === "Transparency, Efficiency, and Incentives"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Transparency, Efficiency, and Incentives">
                Commodities Tokenization Using the EGO-404 Token Standard
              </a>
            </div>
            <div
              className={
                activeSection ===
                "Earning Rewards in the Egochain Ecosystem: Pathways to Participation"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Earning Rewards in the Egochain Ecosystem: Pathways to Participation">
                Addressing Liquidity Challenges
              </a>
            </div>
            <div
              className={
                activeSection === "Fueling Growth Through Rewards"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Fueling Growth Through Rewards">
                Mint-and-Burn Mechanism
              </a>
            </div>
            <div
              className={
                activeSection === "Enhanced Ownership Structure"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Enhanced Ownership Structure">
                Enhanced Ownership Structure
              </a>
            </div>
            <div
              className={
                activeSection === "Dynamic NFT Creation"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Dynamic NFT Creation">Dynamic NFT Creation</a>
            </div>
            <div
              className={
                activeSection === "The EGC Coin (EGC)"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#The EGC Coin (EGC)">Overview of the Egomart Exchange</a>
            </div>
            <div
              className={
                activeSection === "Basic Attributes"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Basic Attributes">Basic Attributes</a>
            </div>
            <div
              className={
                activeSection === "Tokens and Their Roles"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Tokens and Their Roles">Tokens and Their Roles</a>
            </div>
            <div
              className={
                activeSection === "Tokenized Commodities Trading"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Tokenized Commodities Trading">
                Tokenized Commodities Trading
              </a>
            </div>
            <div
              className={
                activeSection ===
                "Subsidizing Commodity Prices with Daily Blockchain Block Rewards: An In-Depth Analysis"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Subsidizing Commodity Prices with Daily Blockchain Block Rewards: An In-Depth Analysis">
                Subsidizing Commodity Prices with Daily Blockchain Block
                Rewards: An In-Depth Analysis
              </a>
            </div>
            <div
              className={
                activeSection === "Overview of Block Rewards"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Overview of Block Rewards">Overview of Block Rewards</a>
            </div>
            <div
              className={
                activeSection === "Distributing Egax Coin"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Distributing Egax Coin">Distributing Egax Coin</a>
            </div>
            <div
              className={
                activeSection === "Electric Vehicle Smart Charging System"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Electric Vehicle Smart Charging System">
                Subsidized Price Formula
              </a>
            </div>
            <div
              className={
                activeSection === "Smart Charging Architecture"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Smart Charging Architecture">Total Subsidy per Day</a>
            </div>
            <div
              className={
                activeSection === "Adjusted Demand and Market Dynamics"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Adjusted Demand and Market Dynamics">
                Adjusted Demand and Market Dynamics
              </a>
            </div>
            <div
              className={
                activeSection === "Economic Implications"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Economic Implications">Economic Implications</a>
            </div>
            <div
              className={
                activeSection === "Optimal Subsidization Rate α"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Optimal Subsidization Rate α">
                Optimal Subsidization Rate α
              </a>
            </div>
            <div
              className={
                activeSection === "Supply and Demand Equilibrium"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Supply and Demand Equilibrium">
                Supply and Demand Equilibrium
              </a>
            </div>
            <div
              className={
                activeSection === "Impact on Tokenomics"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Impact on Tokenomics">Impact on Tokenomics</a>
            </div>
            <div
              className={
                activeSection === "Example Calculation"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Example Calculation">Example Calculation</a>
            </div>
            <div
              className={
                activeSection === "Conclusion"
                  ? "active"
                  : "whitePaper_div_area_body_side_list"
              }
            >
              <a href="#Conclusion">Conclusion</a>
            </div>
          </div>
          <div className="mobile_header">
            {/* <div className="container"> */}
            <div className="mobile_header_area">
              <Accordion>
                <AccordionItem header="Menu ">
                  <div className="mobile_header_links_area">
                    <div
                      className={
                        activeSection === "abstract"
                          ? "active"
                          : " whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#abstract">Abstract</a>
                    </div>
                    <div
                      className={
                        activeSection === "introduction"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#introduction">Introduction</a>
                    </div>
                    <div
                      className={
                        activeSection ===
                        "The Problem: Commodities and Economic Pressure"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#The Problem: Commodities and Economic Pressure">
                        The Problem: Commodities and Economic Pressure
                      </a>
                    </div>
                    <div
                      className={
                        activeSection ===
                        "Streamlining Manufacturing and Boosting Accessibility"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Streamlining Manufacturing and Boosting Accessibility">
                        The Egomart Solution: Decentralization, Tokenization,
                        and Subsidization
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Vision and Mission"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#in-mcd-we-trust">Vision and Mission</a>
                    </div>
                    <div
                      className={
                        activeSection ===
                        "Charging costs & Improved charging infrastructure"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Charging costs & Improved charging infrastructure">
                        Why Egomart?
                      </a>
                    </div>
                    <div
                      className={
                        activeSection ===
                        "Transparency, Efficiency, and Incentives"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Transparency, Efficiency, and Incentives">
                        Commodities Tokenization Using the EGO-404 Token
                        Standard
                      </a>
                    </div>
                    <div
                      className={
                        activeSection ===
                        "Earning Rewards in the Egochain Ecosystem: Pathways to Participation"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Earning Rewards in the Egochain Ecosystem: Pathways to Participation">
                        Earning Rewards in the Egochain Ecosystem: Pathways to
                        Participation
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Fueling Growth Through Rewards"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Fueling Growth Through Rewards">
                        Mint-and-Burn Mechanism
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Enhanced Ownership Structure"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Enhanced Ownership Structure">
                        Enhanced Ownership Structure
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Dynamic NFT Creation"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Dynamic NFT Creation">Dynamic NFT Creation</a>
                    </div>
                    <div
                      className={
                        activeSection === "The EGC Coin (EGC)"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#The EGC Coin (EGC)">The EGC Coin (EGC)</a>
                    </div>
                    <div
                      className={
                        activeSection === "Basic Attributes"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Basic Attributes">Basic Attributes</a>
                    </div>
                    <div
                      className={
                        activeSection === "Tokenization"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Tokenization">Tokenization</a>
                    </div>
                    <div
                      className={
                        activeSection === "Tokenized Commodities Trading"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Tokenized Commodities Trading">
                        Tokenized Commodities Trading
                      </a>
                    </div>
                    <div
                      className={
                        activeSection ===
                        "Subsidizing Commodity Prices with Daily Blockchain Block Rewards: An In-Depth Analysis"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Subsidizing Commodity Prices with Daily Blockchain Block Rewards: An In-Depth Analysis">
                        Subsidizing Commodity Prices with Daily Blockchain Block
                        Rewards: An In-Depth Analysis
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Overview of Block Rewards"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Overview of Block Rewards">
                        Overview of Block Rewards
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Distributing Egax Coin"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Distributing Egax Coin">
                        Mathematical Framework for Price Subsidization
                      </a>
                    </div>
                    <div
                      className={
                        activeSection ===
                        "Electric Vehicle Smart Charging System"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Electric Vehicle Smart Charging System">
                        Subsidized Price Formula
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Smart Charging Architecture"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Smart Charging Architecture">
                        Total Subsidy per Day
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Adjusted Demand and Market Dynamics"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Adjusted Demand and Market Dynamics">
                        Adjusted Demand and Market Dynamics
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Economic Implications"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Economic Implications">
                        Determining Electric Vehicle (EV) Flexibility for Next
                        Time Step
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Optimal Subsidization Rate α"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Optimal Subsidization Rate α">
                        Optimal Subsidization Rate α
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Supply and Demand Equilibrium"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Supply and Demand Equilibrium">
                        Supply and Demand Equilibrium
                      </a>
                    </div>
                    <div
                      className={
                        activeSection === "Impact on Tokenomics"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Impact on Tokenomics">Impact on Tokenomics</a>
                    </div>
                    <div
                      className={
                        activeSection === "Example Calculation"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Example Calculation">Example Calculation</a>
                    </div>
                    <div
                      className={
                        activeSection === "Conclusion"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Conclusion">Conclusion</a>
                    </div>
                    <div
                      className={
                        activeSection === "Conclusion"
                          ? "active"
                          : "whitePaper_div_area_body_side_list"
                      }
                    >
                      <a href="#Conclusion">Conclusion</a>
                    </div>
                  </div>{" "}
                </AccordionItem>
              </Accordion>
            </div>
            {/* </div> */}
          </div>

          {/* ---------==--=-=-- */}
          {/* ---------==--=-=-- */}
          {/* ---------==--=-=-- */}
          {/* ---------==--=-=-- */}
          {/* ---------==--=-=-- */}
          <div
            className="whitePaper_div_area_body_area"
            id="content"
            // ref={contentRef}
          >
            <div className="whitePaper_div_area_title">
              Egomart: Decentralized Commodity Exchange. Powered by Blockchain
              Technology.
            </div>
            {/* =========== */}
            {/* =========== */}
            <section
              id="abstract"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Abstract
              </div>{" "}
              The recent surge in commodity prices, particularly in developing
              nations, has exceeded 1000%, leading to widespread public
              discontent, especially among middle-class and salaried
              individuals. Egomart is a protocol built on the Egochain network
              designed to address these challenges. It aims to subsidize
              tokenized commodities traded on its platform using block rewards
              from Egochain, offering a transparent supply chain and a
              decentralized distribution channel. This allows for seamless
              global trading of commodities, regardless of location, providing
              an accessible solution to rising costs.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="introduction"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Introduction
              </div>{" "}
              The global economy has witnessed unprecedented rise in commodity
              prices, with developing nations bearing the brunt of these surges.
              Over the past decade, some countries have seen commodity price
              increases exceeding 1000%, a situation exacerbated by economic
              instability, inflation, and market speculation. This phenomenon
              has significantly affected the purchasing power of middle-class
              and salaried individuals, intensifying public discontent and
              creating a ripple effect across global supply chains.
              <br />
              <br />
              Traditional market mechanisms, centralized trading platforms, and
              opaque supply chains have been unable to mitigate these rising
              costs effectively. Developing nations are particularly vulnerable
              due to weak regulatory frameworks, inefficient distribution
              systems, and exposure to market volatility. Consequently, millions
              of individuals are facing diminishing living standards as the
              prices of essential goods become increasingly unaffordable.
              <br />
              <br />
              In response to these challenges, Egomart emerges as a
              revolutionary protocol designed to leverage blockchain technology
              to address inefficiencies in the commodity trading ecosystem.
              Built on the robust and scalable Egochain network, Egomart
              introduces a decentralized exchange where tokenized commodities
              can be traded seamlessly. By utilizing block rewards from
              Egochain, the protocol offers subsidies for these commodities,
              lowering costs and providing users with a more affordable and
              transparent trading environment.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="The Problem: Commodities and Economic Pressure"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                The Problem: Commodities and Economic Pressure
              </div>{" "}
              The surge in commodity prices is not a recent phenomenon, but the
              scale and pace of the current price hikes are unprecedented.
              Driven by a combination of global supply chain disruptions,
              geopolitical tensions, and speculative trading, the price of
              essential commodities—such as food, fuel, and raw materials—has
              skyrocketed. While some of the world’s wealthiest nations have
              absorbed these shocks through subsidies and policy interventions,
              developing nations have not been as fortunate.
              <br />
              <br />
              For individuals in these countries, the impact is felt most
              acutely by the middle class and salaried workers, who are
              typically more dependent on stable commodity prices. Without
              adequate government support or access to affordable alternatives,
              these populations face a steep decline in their purchasing power,
              resulting in social unrest and economic stagnation.
              <br />
              <br />
              Traditional commodity trading systems, dominated by centralized
              platforms, lack the transparency, accountability, and efficiency
              needed to address these issues. Moreover, the existing supply
              chain mechanisms are prone to delays, manipulation, and
              inefficiencies that contribute to the high cost of goods. These
              challenges underline the need for a more efficient and
              decentralized approach to commodity trading, which Egomart aims to
              deliver.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Streamlining Manufacturing and Boosting Accessibility"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                The Egomart Solution: Decentralization, Tokenization, and
                Subsidization
              </div>{" "}
              Egomart’s unique value proposition lies in its integration of
              decentralized blockchain technology with tokenized commodity
              trading. By using Egochain’s block rewards, Egomart is able to
              offer subsidized commodities on its platform. The protocol
              provides a transparent and decentralized supply chain that is
              accessible to users across the globe, irrespective of their
              geographic location.
              <br />
              <br />
              Key components of the Egomart solution include:
              <span>
                <li>
                  <b> Tokenized Commodities:</b> Egomart transforms real-world
                  commodities into digital assets (tokens) that can be traded on
                  the platform. This tokenization process brings a new level of
                  transparency and efficiency to commodity markets, allowing
                  users to track the entire lifecycle of a commodity, from
                  production to delivery.
                </li>
                <li>
                  <b> Subsidized Trading: </b> Unlike traditional markets,
                  Egomart leverages block rewards generated by Egochain to
                  subsidize commodity prices. These subsidies help mitigate the
                  impact of market volatility and provide users with access to
                  essential goods at lower prices. This 5 mechanism directly
                  benefits those most affected by rising commodity prices,
                  particularly in developing nations.
                </li>
                <li>
                  <b> Decentralized Distribution:</b> Egomart’s decentralized
                  structure ensures that no single entity has control over the
                  platform, preventing market manipulation and enhancing trust
                  among participants. This decentralized distribution model is
                  also more resilient to geopolitical disruptions and regulatory
                  roadblocks that often hinder cross-border commodity trading.
                </li>
                <li>
                  <b> Global Accessibility: </b> The platform is designed to be
                  inclusive and borderless, offering users the ability to trade
                  commodities from any location. This global accessibility is
                  critical in fostering an open market that can absorb and adapt
                  to fluctuations in demand and supply, without being
                  constrained by regional limitations.
                </li>
              </span>
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Vision and Mission"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Vision and Mission
              </div>{" "}
              Egomart is driven by the vision of creating an equitable and
              sustainable exchange for global commodity trading, especially for
              vulnerable populations in developing nations. By leveraging
              blockchain technology, the protocol aims to democratize access to
              essential goods, reduce inefficiencies in the supply chain, and
              provide users with transparent, fair, and affordable trading
              opportunities.
              <br />
              <br />
              <b> Our mission </b>
              is to revolutionize the way commodities are traded, bringing the
              benefits of decentralization to communities that need it most.
              Through the innovative use of tokenization and subsidization,
              Egomart seeks to empower individuals and shield them from the
              damaging effects of market volatility.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Charging costs & Improved charging infrastructure"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Why Egomart?
              </div>{" "}
              Egomart is a solution designed for the future of global trade.
              Traditional commodity markets are failing the very populations
              they were meant to serve, with inefficiencies, lack of
              transparency, and high costs limiting their effectiveness.
              Egomart, built on the power of blockchain, offers a new path
              forward.
              <br />
              <br />
              <ol>
                <li>
                  <b>Transparent Supply Chains: </b> Every step of the
                  commodity’s journey is recorded on a public blockchain,
                  providing full transparency for users and fostering trust in
                  the system.
                </li>
                <li>
                  <b> Subsidized Pricing: </b> By utilizing block rewards from
                  Egochain, Egomart directly addresses the issue of rising
                  costs, ensuring that essential goods remain affordable to
                  those most affected by price surges.{" "}
                </li>
                <li>
                  <b> Decentralized Control: </b>Egomart’s decentralized
                  architecture eliminates the possibility of manipulation by
                  powerful market players, ensuring fair and open access to the
                  platform for all users.
                </li>
                <li>
                  <b> Borderless Trading: </b>As a globally accessible platform,
                  Egomart facilitates cross-border commodity trading without the
                  traditional friction caused by intermediaries, regulations, or
                  market monopolies.
                </li>
              </ol>
              <br />
              <br />
              Egomart stands at the intersection of technological innovation and
              social good, offering a platform that not only addresses rising
              commodity prices but also provides a blueprint for a fairer and
              more resilient global trading system.
              <br />
              <br />
              The surge in commodity prices has laid bare the vulnerabilities of
              traditional markets, particularly in developing nations where
              millions of individuals are struggling to maintain their
              livelihoods. Egomart, powered by Egochain, offers a decentralized
              solution that leverages blockchain technology to create a
              transparent, equitable, and sustainable marketplace. By tokenizing
              commodities and providing subsidies through block rewards, Egomart
              enables individuals to trade goods affordably, regardless of
              location, and shields them from the volatility of global markets.
              <br />
              <br />
              In the following sections of this whitepaper, we will explore the
              technical architecture of Egomart, the economic model behind its
              subsidy mechanism, and the governance structure that ensures its
              decentralized and equitable operation.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Transparency, Efficiency, and Incentives"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Commodities Tokenization Using the EGO-404 Token Standard
              </div>{" "}
              The tokenization of commodities represents a transformative
              approach to asset management and trading within the egomart
              ecosystem. On the Egochain blockchain, commodities are tokenized
              through the innovative EGO-404 token standard. This standard
              uniquely combines the attributes of EGO-20 (fungible tokens) and
              EGO-721 (non-fungible tokens), enabling the creation of what are
              known as “semi-fungible” tokens. This flexibility allows these
              tokens to function interchangeably, akin to EGO-20 tokens, while
              also possessing unique characteristics similar to EGO-721
              non-fungible tokens (NFTs).
              <br />
              <br />
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Earning Rewards in the Egochain Ecosystem: Pathways to Participation"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Addressing Liquidity Challenges
              </div>{" "}
              One of the primary objectives of the EGO-404 standard is to tackle
              the liquidity challenges that have traditionally plagued the
              commodity market. By facilitating fractional ownership of
              commodities, the EGO-404 standard allows users to invest in
              portions of commodities rather than requiring the purchase of
              entire units. This fractionalization significantly lowers the
              entry barrier for investors, making commodities accessible to a
              broader audience through platforms like the Egomart exchange.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Fueling Growth Through Rewards"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Mint-and-Burn Mechanism
              </div>{" "}
              The EGO-404 token standard operates on a sophisticated
              mint-and-burn mechanism, which allows for the division of
              tokenized commodities into smaller, tradable fractions. When users
              acquire fractional shares, these tokens can be reassembled into
              whole tokens when sufficient fractions are combined. This process
              not only enhances the liquidity of commodities but also
              democratizes access to them, providing users with greater
              flexibility in managing their commodity investments.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Enhanced Ownership Structure"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Enhanced Ownership Structure
              </div>{" "}
              Unlike traditional commodities, which are typically indivisible,
              the EGO-404 standard allows for a seamless and efficient
              fractional ownership model. Ownership of these fractional shares
              is managed directly within the token structure, eliminating the
              need for third-party platforms that often complicate the breakdown
              of ownership into smaller pieces. As a result, users can buy and
              sell fractional shares of a commodity directly, significantly
              enhancing liquidity within the market. This capability is
              particularly beneficial for attracting a larger pool of investors
              and facilitating dynamic trading activity.
              <br />
              <br />
            </section>
            <div className="break_line_txt">
              {/* The Egochain blockchain interacts with two kinds of coins */}
            </div>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Dynamic NFT Creation"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Dynamic NFT Creation
              </div>{" "}
              <br />
              A key feature of the EGO-404 standard is its ability to mint whole
              NFTs from accumulated fractional shares of a tokenized commodity.
              When enough fractions are gathered, a complete NFT can be
              generated, representing the entirety of the commodity. Conversely,
              if fractional shares are sold off, the corresponding portions of
              the NFT are “burned” or destroyed. This dynamic interplay between
              fractional ownership and NFT creation ensures that the value and
              utility of the tokenized commodity are preserved, fostering an
              engaging and interactive trading environment.
              <br />
              <br />
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="The EGC Coin (EGC)"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Overview of the Egomart Exchange
              </div>{" "}
              <br />
              <br />
              The Egomart Exchange is an innovative marketplace built on the
              Egochain blockchain, designed to tokenize real-world commodities
              and facilitate seamless trading experiences. It leverages the
              power of blockchain to enhance commercial transactions, create
              liquidity for traditionally illiquid assets, and enable users to
              trade tokenized commodities with the ease and efficiency of
              cryptocurrencies.
              <br />
              <br />
              In the following sections, we will provide a detailed breakdown of
              the core components and functionality of the Egomart Exchange,
              along with an explanation of its token ecosystem and operational
              model.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Basic Attributes"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Basic Attributes
              </div>{" "}
              <br />
              <br />
              The Egomart Exchange operates on the Egochain blockchain, which is
              a highly efficient, Ethereum-compatible blockchain built using the
              Cosmos SDK. Egochain offers a robust and scalable infrastructure
              that supports the tokenization of real-world assets and enables
              seamless transactions. The exchange is designed to enhance
              commercial experiences by bridging the gap between traditional
              asset markets and the blockchain economy.
              <br />
              <br />
              A critical feature of Egomart is its ability to provide secondary
              liquidity for tokenized real-world assets. Traditionally, assets
              such as commodities, luxury goods, or collectibles suffer from
              illiquidity due to their high entry barriers and the complex
              logistics involved in physical ownership and transfer. Egomart
              addresses this challenge by tokenizing these assets and allowing
              users to trade fractional ownership through a blockchain platform,
              thereby creating an accessible, liquid market for these
              commodities.
              <br />
              <br />
              <b className="">Centralization and Future Decentralization</b>
              At its initial launch, the Egomart Protocol will function in a
              substantially centralized manner. This decision has been made to
              ensure a smooth rollout of the platform’s features, with the
              founding team overseeing key operations. However, over time,
              Egomart will gradually migrate its protocol components to an
              on-chain governance model, reducing reliance on the founding team
              and decentralizing control. This transition will empower the
              Egomart community to participate in decision-making processes and
              foster a decentralized exchange ecosystem.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Tokens and Their Roles"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Tokens and Their Roles
              </div>{" "}
              <br />
              The Egomart Exchange utilizes three primary types of tokens, each
              serving a distinct function within its ecosystem. These tokens
              work together to enable a seamless and efficient marketplace for
              the tokenized trading of commodities.
              <br />
              <br />
              <ol className="">
                <li>
                  <b> EgoUSD (EGOD)</b> EgoUSD (EGOD) is the stablecoin used for
                  all trades on the Egomart Exchange. It is pegged to the value
                  of the US 10 dollar, providing stability and predictability in
                  transactions. Users can hold and spend EgoUSD much like fiat
                  currencies such as US dollars, making it a familiar and
                  accessible medium of exchange for both traditional and
                  blockchain-based traders. EgoUSD acts as the primary trading
                  pair for tokenized commodities on Egomart, ensuring that users
                  can easily buy and sell assets without the volatility often
                  associated with cryptocurrencies. This stablecoin offers an
                  essential bridge between the volatility of blockchain markets
                  and the real-world value of commodities, providing a secure
                  and reliable trading environment.
                </li>
                <br />
                <br />

                <li>
                  <b> Egochain Coin (EGAX)</b> Egochain Coin (EGAX) is the
                  native cryptocurrency of the Egochain blockchain. It plays a
                  dual role within the Egomart ecosystem:
                  <br />
                  <br />
                  <br />
                  <ul>
                    <li>
                      <b> Generation of EgoUSD: </b> EGAX can be burned
                      (destroyed) to mint EgoUSD, effectively creating new units
                      of the stablecoin for trading on the platform. This
                      mechanism ensures a controlled and sustainable issuance of
                      EgoUSD, which is backed by the value of EGAX.
                    </li>
                    <br />
                    <br />
                    <br />
                    <li>
                      <b>Gas Fees: </b> EGAX is also used to pay for transaction
                      fees (gas fees) on the Egochain blockchain. This ensures
                      that users can interact with the blockchain efficiently
                      and that the system remains secure and operational.
                    </li>
                  </ul>
                </li>

                <br />
                <br />
                <br />
                <li>
                  The dual role of EGAX within the Egomart ecosystem ensures
                  that it remains an integral component of the platform,
                  supporting both transactional liquidity and network stability.
                </li>
                <br />
                <br />
                <br />
                <li>
                  <b>Tokenized Commodities </b> One of the most innovative
                  aspects of Egomart is the tokenization of real-world
                  commodities. These commodities—such as electronic gadgets,
                  automobiles, rice, and other goods—are represented on the
                  blockchain as digital tokens, allowing them to be traded just
                  like cryptocurrencies. Each tokenized 11 commodity corresponds
                  to a physical asset, and users have the option to redeem these
                  tokens for their physical equivalent if desired. This process
                  of tokenization unlocks liquidity for traditionally illiquid
                  assets, allowing them to be fractionally owned, traded, or
                  even held as investments. By converting these commodities into
                  digital tokens, Egomart allows users to buy, sell, and trade
                  them using EgoUSD, providing an efficient and accessible
                  marketplace for commodities that were previously difficult to
                  trade in real-time.
                </li>
              </ol>
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Tokenized Commodities Trading"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Tokenized Commodities Trading
              </div>{" "}
              <br />
              <br />
              The ability to trade tokenized commodities on the Egomart Exchange
              is a breakthrough in asset liquidity. Users can trade these
              commodities with the same ease and flexibility as
              cryptocurrencies, all while knowing that their tokens are backed
              by real-world physical goods. This system not only democratizes
              access to valuable commodities but also introduces a new level of
              liquidity and market efficiency to sectors that have traditionally
              been slow-moving and difficult to access.
              <br />
              <br />
              Through this model, Egomart positions itself as a pioneering
              platform that merges the security and transparency of blockchain
              technology with the practicality and utility of real-world assets,
              creating a dynamic and scalable marketplace for the future of
              digital commerce.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Subsidizing Commodity Prices with Daily Blockchain Block Rewards: An In-Depth Analysis"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Subsidizing Commodity Prices with Daily Blockchain Block
                Rewards: An In-Depth Analysis
              </div>{" "}
              <br />
              <br />
              Blockchain-based systems have the potential to disrupt traditional
              commodity markets by providing decentralized mechanisms for
              pricing, liquidity, and accessibility. One innovative approach to
              reducing the cost of commodities on such platforms is through
              subsidization via daily block rewards. In this mechanism, a
              portion of the block rewards generated by the blockchain can be
              allocated to reduce the market price of tokenized 12 commodities,
              thereby making these assets more affordable to users while
              maintaining the overall stability of the system.
              <br />
              <br />
              This in-depth write-up explores how block rewards can be utilized
              to subsidize commodity prices, the underlying mathematical
              formulae, and the economic considerations required to maintain
              system equilibrium.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Overview of Block Rewards"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Overview of Block Rewards
              </div>{" "}
              <br />
              In proof-of-stake (PoS) like Egochain, block rewards are issued as
              incentives for validators (in PoS) who contribute computational
              resources to secure and maintain the network. These rewards
              typically come in the form of newly minted tokens and represent an
              essential part of the blockchain’s monetary supply mechanism.
              <br />
              <br />
              When applied to a commodity exchange, block rewards can be used to
              lower commodity prices by subsidizing trades. Instead of solely
              distributing rewards to validators, a portion of these rewards can
              be allocated to the commodity market to reduce prices for buyers.
              <br />
              <br />
              This incentivizes participation on the platform while enhancing
              liquidity and affordability.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Distributing Egax Coin"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Mathematical Framework for Price Subsidization
              </div>{" "}
              <br />
              To design a sustainable model for subsidizing commodity prices
              using block rewards, we can define the following variables:
              <br />
              <br />
              <ul>
                <li>Pmarket:Marketpriceofthecommoditywithoutsubsidies.</li>
                <li>Psubsidized:Subsidizedpriceofthecommodityfortheuser.</li>
                <li>Rblock:Dailyblockrewardissuedbytheblockchain.</li>

                <li>
                  α:Percentageofdailyblockrewardallocatedforcommoditysubsidies
                  (subsidization rate).
                </li>
                <li>Vtotal:Totalvalueoftokenizedcommoditiesontheexchange.</li>
                <li>
                  Qcommodities: Total quantity of tokenized commodities
                  available on the exchange.
                </li>
                <li>Scommodity:Subsidyamountpercommodityunit.</li>
                <li>
                  Nusers: Number of users interacting with the commodity market
                  per day.
                </li>
                <li>
                  Ddaily:Totaldailydemandforthecommodity(numberofunitsbought per
                  day).
                </li>
              </ul>
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Electric Vehicle Smart Charging System"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Subsidized Price Formula
              </div>{" "}
              <br />
              The core formula for the subsidized price Psubsidized is based on
              reducing the market price Pmarket by the subsidy Scommodity, which
              is derived from the block rewards allocated for this purpose:
              <br />
              <br />
              <i
                className=""
                style={{
                  fontStyle: "italic",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Psubsidized =Pmarket −Scommodity
              </i>
              <br />
              <br />
              <br />
              Where Scommodity, the subsidy per unit of the commodity, is
              derived from the daily block reward allocation:
              <br />
              <br />
              <img src="/img/equation/block-allocation.png" alt="" />
              <br />
              <br />
              This equation shows that the total block reward portion allocated
              for subsidies is spread across the number of commodity units
              bought each day. As a result, the more commodities are purchased,
              the lower the per-unit subsidy becomes.
            </section>
            {/* <div className="break_line_txt">APPROACH AND SIMULATIONS</div> */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Smart Charging Architecture"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Total Subsidy per Day
              </div>{" "}
              <br />
              <br />
              The total subsidy allocated per day, Tsubsidy, is calculated by
              taking the percentage of the daily block reward dedicated to
              subsidies:
              <br />
              <br />
              <div className="">Tsubsidy=αRblock</div>
              <br />
              <br />
              This amount is the total sum available for reducing commodity
              prices across all users on a daily basis.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Adjusted Demand and Market Dynamics"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Adjusted Demand and Market Dynamics
              </div>{" "}
              <br />
              One of the essential dynamics to consider in this model is that
              demand for commodities Ddaily will likely increase as prices drop
              due to subsidies. This can be modeled by an elasticity coefficient
              ε, which represents the price elasticity of demand for the
              commodity:
              <br />
              <br />
              <img src="/img/equation/elasticity.png" alt="" />
              Where:
              <li>D0 is the initial daily demand without subsidies.</li>
              <li>
                ε is the elasticity of demand (how responsive demand is to price
                changes).
              </li>
              <br />
              <br />
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Economic Implications"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Economic Implications
              </div>{" "}
              <br />
              <br />
              The system must balance the rate of subsidization and the overall
              market equilibrium. Several key considerations must be evaluated
              when implementing this system:
              <br />
              <br />
            </section>

            {/* =============== */}
            {/* =============== */}
            <section
              id="Optimal Subsidization Rate α"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Optimal Subsidization Rate α:
              </div>{" "}
              <br />
              <br />
              The subsidization rate α should be carefully calibrated to ensure
              that enough of the block rewards are allocated to commodity price
              reductions while maintaining sufficient rewards for validators and
              other blockchain participants.
              <br />
              <br />
              An excessively high α may deplete the block rewards, reducing
              incentives for validators or miners and possibly destabilizing the
              network’s security. On the other hand, a too-low α may result in
              insufficient price subsidies, failing to make commodities more
              accessible for users.
              <br />
              <br />
              To determine the optimal α, we could aim for a target subsidy that
              satisfies a specific price reduction goal. For example, if the
              goal is to reduce commodity prices by 20%, then:
              <div className="" style={{ fontStyle: "italic" }}>
                Scommodity=0.20×Pmarket
              </div>
              <div className="">
                Using the earlier formula, we can solve for α:
              </div>
              <br />
              <br />
              <img src="/img/equation/optimal-subsidization.png" alt="" />
              <br />
              <br />
              This gives us a target α based on the market price, daily demand,
              and block rewards.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Supply and Demand Equilibrium"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Supply and Demand Equilibrium
              </div>
              <br />
              <br />
              Subsidization will likely lead to increased demand, so supply
              constraints must be considered. If demand outstrips the available
              supply of tokenized commodities, it may lead to price inflation or
              scarcity. Therefore, the system should be flexible enough to
              adjust the subsidy rate based on fluctuations in market demand.
              <br />
              <br />
              In some cases, implementing a dynamic α that adjusts based on
              demand and supply conditions might be more sustainable. This can
              be done through a feedback loop mechanism where the subsidization
              rate is reduced as demand increases to prevent overheating of the
              market.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Impact on Tokenomics"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Impact on Tokenomics:
              </div>{" "}
              <br />
              The burning of the blockchain’s native cryptocurrency (in this
              case, EGAX) to generate the stablecoin (e.g., EgoUSD) introduces a
              deflationary mechanism that can balance the issuance of block
              rewards. By burning a portion of the circulating supply, the
              system can mitigate inflationary pressure caused by the block
              rewards. This ensures long-term sustainability and value retention
              of the native token.
              <br />
              <br />
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Example Calculation"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Example Calculation
              </div>
              <br />
              <br />
              Let’s consider a hypothetical scenario:
              <br />
              <br />
              <span>
                <ul>
                  <li>Pmarket =100 EgoUSD (price per unit of a commodity)</li>
                  <li>
                    Rblock =10,000 EgoUSD (total daily block reward)inEGAX
                  </li>
                  <li>α =0.10 (10% of block rewards allocated to subsidies)</li>
                  <li>Ddaily=500 units(daily demand for the commodity)</li>
                </ul>
              </span>
              <br />
              <br />
              Using the subsidy formula:
              <br />
              <br />
              <img src="/img/equation/subsidy.png" alt="" />
              <br />
              <br />
              Thus, the subsidized price per commodity unit becomes:
              <br />
              <br />
              <img src="/img/equation/subsidy2.png" alt="" />
              <br />
              <br />
              In this case, the user will be able to purchase the commodity for
              98 EgoUSD instead of 100, thanks to the daily block reward
              subsidy.
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            <section
              id="Conclusion"
              className="whitePaper_div_area_body_area_section"
            >
              <div className="whitePaper_div_area_body_area_section_title">
                Conclusion
              </div>{" "}
              <br />
              <br />
              Subsidizing commodity prices through daily block rewards is a
              powerful mechanism to enhance liquidity, lower costs, and promote
              greater participation in blockchain-based commodity markets. By
              using a portion of the daily block rewards to offset the price of
              tokenized commodities, this system can make assets more affordable
              and accessible, while also driving up demand.
              <br />
              <br />
              The implementation of this model requires careful attention to the
              subsidization rate, demand elasticity, and overall blockchain
              economics to ensure sustainable operation. Balancing the issuance
              of block rewards, the burning of native tokens, and the market
              dynamics of tokenized commodities will be critical to the
              long-term success of such a platform.
              <br />
              <br />
            </section>
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
            {/* =============== */}
          </div>
        </div>
      </div>
      <img
        src="/img/hero_bg_light.svg"
        alt=""
        className="home_div_section1_bg_light"
      />
      <img
        src="/img/test_hero_light2.svg"
        alt=""
        className="home_div_section1_bg_light2"
      />
      <img src="/img/grains_ellipse.png" alt="" className="grains_ellipse" />
    </div>
  );
};

export default WhitePaper;
