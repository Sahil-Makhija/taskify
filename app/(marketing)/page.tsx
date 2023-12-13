import { Medal } from "lucide-react";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headingFont, textFontPoppins } from "@/lib/fonts";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase ">
          <Medal className="h-6 w-6 mr-2" />
          No 1 Task Management App
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white p-2 rounded-md  w-fit">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 my-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFontPoppins.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Taskify.
      </div>
      <Button>
        <Link href={"/sign-up"}>Get Taskify for Free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
