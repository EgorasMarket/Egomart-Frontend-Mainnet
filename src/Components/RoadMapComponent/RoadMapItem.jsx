import { SchoolIcon, StarIcon, WorkAlertIcon } from "hugeicons-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const RoadMapItem = () => {
  return (
    <div>
      <div className="container">
        <h1>Roadmap</h1>
      </div>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          //   contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentStyle={{ background: "#45b97b", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #45b97b" }}
          iconStyle={{ background: "#45b97b", color: "#fff" }}
          date="Q1 2024 - Q3 2024"
          icon={<WorkAlertIcon />}
        >
          <h3 className="vertical-timeline-element-title"></h3>
          <h4 className="vertical-timeline-element-subtitle"></h4>
          <ul>
            <li className="">
              Production & Assembly:
              <br />
              <br />
              <ul>
                <li>Manufacture 1,000 units of tricycles.</li>
                <li>Assemble 5,000 units of smart televisions.</li>
                <li>Produce 5,000 dual-fuel generators.</li>
                <li>Produce 4,500 deep freezers.</li>
              </ul>
            </li>

            <br />
            <br />
            <li>
              Platform Development:
              <br />
              <br />
              <ul>
                <li>Launch of Egomart Telegram Minibot.</li>
                <li>
                  Launch of the Egomart Protocol Testnet to facilitate
                  early-stage user testing and system optimization.
                </li>
              </ul>
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#45b97b", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #45b97b" }}
          iconStyle={{ background: "#45b97b", color: "#fff" }}
          date="Q4 2024"
          icon={<WorkAlertIcon />}
        >
          <h3 className="vertical-timeline-element-title"></h3>

          <ul>
            <li className="vertical-timeline-element-subtitle">
              Egomart Exchange & Product Expansion
              <br />
              <br />
              <ul>
                <li>
                  September
                  <ul>
                    <li>
                      Launch of the Egomart Exchange Mainnet, enabling real-
                      time trading of tokenized commodities.
                    </li>
                    <li>
                      Host the inaugural trading event to promote platform
                      activity.
                    </li>
                  </ul>
                </li>

                <br />
                <br />
                <li>
                  October
                  <ul>
                    <li>
                      Begin listing third-party commodities on Egomart Exchange,
                      broadening the asset offerings.
                    </li>
                    <li>LaunchofApex28,amajornewproductinitiative.</li>

                    <li>
                      Egomart Exchange to be listed on CoinMarketCap and
                      CoinGecko, increasing visibility and credibility.
                    </li>
                  </ul>
                </li>

                <br />
                <br />

                <li>
                  November
                  <ul>
                    <li>
                      Collaborate with a regulated financial institution to
                      launch a SEC-regulated tokenized Naira stablecoin,
                      ensuring compliance with local financial regulations.
                    </li>
                  </ul>
                </li>
                <br />
                <br />

                <li>
                  December
                  <ul>
                    <li>Onboard 10 million users to the Egomart Protocol.</li>
                    <li>
                      Complete the listing of at least 30 best-selling
                      commodities.
                    </li>
                    <li>
                      Launch the EgoMinibus, enhancing mobility options and
                      expanding product offerings.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          //   contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentStyle={{ background: "#45b97b", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #45b97b" }}
          iconStyle={{ background: "#45b97b", color: "#fff" }}
          date="2025"
          icon={<WorkAlertIcon />}
        >
          <h3 className="vertical-timeline-element-title"></h3>
          <h4 className="vertical-timeline-element-subtitle"></h4>
          <ul>
            <li className="">
              Apex 28 & Industrial Growth:
              <br />
              <br />
              <ul>
                <li>
                  Begin processing orders for Apex28, accelerating revenue
                  generation and market penetration.
                </li>
                <li>
                  Launch a mega factory capable of producing over 20,000 cars
                  annually, solidifying the company’s manufacturing
                  capabilities.
                </li>
              </ul>
            </li>

            <br />
            <br />
            <li>
              User and Protocol Growth:
              <br />
              <br />
              <ul>
                <li>
                  Onboard 50 million users to the Egomart Protocol,
                  significantly expanding the platform's user base.
                </li>
                <li>
                  Integrate a minimum of 100 protocols on the Egochain
                  blockchain, further enhancing the ecosystem's scalability and
                  functionality.
                </li>
              </ul>
            </li>
          </ul>
        </VerticalTimelineElement>

        {/* <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={<StarIcon />}
        /> */}
      </VerticalTimeline>

      {/* <div className="">
        <p className="newFooterDiv_area_2_area2" style={{ padding: "20px" }}>
          This roadmap reflects a strategic blend of product development, user
          growth, and platform expansion, positioning Egomart and Egochain as
          key players in the tokenized commodities and blockchain space.
        </p>
      </div> */}
    </div>
  );
};

export default RoadMapItem;
