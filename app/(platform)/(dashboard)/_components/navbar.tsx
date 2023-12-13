import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FormPopover } from "@/components/form/form-popover";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex px-4 items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4 ">
        <Logo />
        {/* <div className="hidden md:flex">
        </div> */}
        <FormPopover side="bottom" align="start" sideOffset={18}>
          <Button
            size="sm"
            variant={"primary"}
            className="rounded-sm hidden md:block h-auto py-1.5 px-2 "
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            variant={"primary"}
            size="sm"
            className="rounded-sm block md:hidden "
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:ordId"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:orgId"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export { Navbar };
