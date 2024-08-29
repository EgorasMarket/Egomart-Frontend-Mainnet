import React, { useState, useEffect } from "react";
import "./newFooter.css";
import "./footer.css";

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
          <div className="newFooterDiv_area_2">
            <div className="newFooterDiv_area_2_area">
              <div className="newFooterDiv_area_2_area1">
                <div className="footerDiv1_area1_cont1">
                  <img
                    src="/egomart_logo.png"
                    alt=""
                    className="footerDiv1_img2"
                  />
                  Egomart
                </div>
              </div>
              <div className="newFooterDiv_area_2_area2">
                © {currentYear} Egomart. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
