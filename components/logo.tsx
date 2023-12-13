import { headingFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition  items-center gap-x-2 hidden md:flex ">
        <Image src="/logo.svg" alt="_logo" height={30} width={30} />
        <p
          className={cn("text-lg text-neutral-700 pt-1 ", headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
