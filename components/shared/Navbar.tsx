import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SignedIn, UserButton, UserProfile } from "@clerk/nextjs";

const Navbar = () => (
  <div className="flex justify-between items-center bg-dark-200 fixed z-50  w-full  gap-5 shadow-light-300 p-6 dark:shadow-none sm:px-12">
    <nav className="w-full flex flex-1 justify-between ">
      <Link href={"/"} className="flex items-center gap-1 ">
        <Image
          className="pt-1"
          src={"/images/logo.png"}
          alt={"logo"}
          height={100}
          width={100}
        />
      </Link>
      GlobalSearch
      <div>
        <SignedIn>
          <UserButton
            signOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </SignedIn>
        mobile navigation
      </div>
    </nav>
  </div>
);

export default Navbar;
