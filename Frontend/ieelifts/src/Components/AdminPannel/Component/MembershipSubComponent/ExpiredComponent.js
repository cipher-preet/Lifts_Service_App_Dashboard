// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React from "react";
import MembershipExpired from "./MembershipExpired";
import ClientMembershipDetails from "./ClientMembershipDetails";

const ExpiredComponent = ({ DemoData, count }) => {
  return count !== 0 ? (
    <div className="expandedMembershipheading">
      <ClientMembershipDetails isExpired={true} />
      <MembershipExpired DemoData={DemoData} />
    </div>
  ) : (
    <div>
     <span>hello ji</span>

    </div>
  );
};

export default ExpiredComponent;
