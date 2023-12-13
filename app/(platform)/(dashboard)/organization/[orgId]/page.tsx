import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { Info } from "./_components/Info";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/BoardList";

const OrganizationIdPage = () => {
  const { orgId } = auth();
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton/>}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
