import React from "react";
import "./CustomBottomSheet.css";
import { ArrowDown01Icon, ViewIcon, CancelCircleIcon } from "hugeicons-react";

const CustomBottomSheet = ({
  children,
  content,
  isOpen,
  closeModal,
  title,
}) => {
  return (
    <div
      className={
        isOpen ? "customButtomSheetDiv_open" : "customButtomSheetDiv_hidden"
      }
    >
      <div
        className={
          content === "fullHeight"
            ? "customButtomSheetDiv_container_full"
            : content === "contentHeight"
            ? "customButtomSheetDiv_container_content"
            : "customButtomSheetDiv_container"
        }
      >
        {" "}
        <div className="customButtomSheetDiv_container_head">
          <img
            src="/img/line.svg"
            alt=""
            className="ProductDetailPage_div_body_div2_line"
          />
        </div>
        <div className="customButtomSheetDiv_container_body">
          <div className="customButtomSheetDiv_container_body_div1">
            <div className="customButtomSheetDiv_container_body_div1_txt">
              {title}
            </div>
            <div
              className="customButtomSheetDiv_container_body_div1_iocn"
              onClick={closeModal}
            >
              <CancelCircleIcon size={24} />
            </div>
          </div>
          <div className="customButtomSheetDiv_container_body_div2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBottomSheet;
