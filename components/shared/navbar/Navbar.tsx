"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SignedIn, UserButton, UserProfile } from "@clerk/nextjs";
import Theme from "./Theme";
import MobileNavigation from "./MobileNav";

const Navbar = () => (
  <div className="flex justify-between items-center bg-white border-b fixed z-50  w-full  gap-5 shadow-none p-6 sm:px-12 dark:bg-dark-400 dark:shadow-light-300">
    <nav className="w-full flex flex-1  justify-between ">
      <Link href={"/"} className="flex items-center gap-1 ">
        <Image
          className="pt-1 hidden dark:block"
          src={"/assets/images/logo-dark.svg"}
          alt={"logo"}
          height={100}
          width={100}
        />
        <Image
          className="pt-1 block dark:hidden"
          src={"/assets/images/logo-light.svg"}
          alt={"logo"}
          height={100}
          width={100}
        />
      </Link>
      GlobalSearch
      <div className="flex justify-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            //signOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </SignedIn>
        <MobileNavigation />
      </div>
    </nav>
  </div>
);

export default Navbar;
