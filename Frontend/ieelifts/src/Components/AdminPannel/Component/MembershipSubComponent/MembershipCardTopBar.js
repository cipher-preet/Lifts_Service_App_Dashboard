// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React from "react";

const MembershipCardTopBar = ({
  DemoData,
  setClick,
  order,
  clickCount,
  titleClass,
  cardColor,
}) => {
  return (
    <div
      className={`membership_card_topbar ${
        setClick
          ? order !== 1
            ? "membership_card_topbar_non_expand "
            : ` membership_card_topbar_expand  ${
                clickCount !== 1 ? "animation" : "animationExpand"
              }
          `
          : ""
      }`}
    >
      <div className="membership_card_topbar_left">
        <p className={`membership_card_title ${titleClass}`}>
          {DemoData?.dataType}
        </p>
        <p
          className="membership_card_revenue"
          style={setClick ? { display: "none" } : {}}
        >
          Revenue
          {DemoData?.Data?.details?.totalRevenue !== undefined
            ? `: ₹${DemoData?.Data?.details?.totalRevenue}`
            : " --"}
        </p>
      </div>
      <div
        className={`membership_card_counts ${cardColor} ${
          setClick && "membership_card_counts_expand"
        } ${order === 1 && "membership_card_counts_expanded"}`}
        style={{
          padding: setClick ? (order !== 1 ? "2% 3%" : "1% 1.2%") : "",
        }}
      >
        <p>{DemoData?.Data?.details?.count}</p>
      </div>
    </div>
  );
};

export default MembershipCardTopBar;
