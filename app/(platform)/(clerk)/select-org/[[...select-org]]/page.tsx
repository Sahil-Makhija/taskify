import React from "react";
import { OrganizationList } from "@clerk/nextjs";
const SelectOrgPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:orgId"}
      afterCreateOrganizationUrl={"/organization/:orgId"}
    />
  );
};

export default SelectOrgPage;
