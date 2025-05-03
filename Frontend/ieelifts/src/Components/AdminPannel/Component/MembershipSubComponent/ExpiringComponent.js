// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React from "react";
import MembershipExpiring from "./MembershipExpiring";
import ClientMembershipDetails from "./ClientMembershipDetails";

const ExpiringComponent = ({ DemoData, count }) => {
  return count !== 0 ? (
    <div className="expandedMembershipheading">
      <ClientMembershipDetails dataType={DemoData?.dataType} />
      <MembershipExpiring DemoData={DemoData} />
    </div>
  ) : (
    <div className="no_expire_membership">No client memberships are expiring soon</div>
  );
};

export default ExpiringComponent;
