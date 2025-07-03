"use client";
import { sidebarLinks } from "@/app/constants";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <>
      <div
        className="border-r border shadow-2xl/20 hidden sm:block flex- w-[220px] h-screen background-light900_dark300 fixed 
          overflow-auto
      
      "
      >
        <div className="mt-26 h-full overflow-y-auto">
          {sidebarLinks.map((items) => {
            if (items.label === "Profile") return null;
            const isActive =
              (pathname.includes(items.route) && items.route.length > 1) ||
              pathname === items.route;
            return (
              <Link
                key={items.route}
                href={items.route}
                className={`flex flex-row py-3 my-4  rounded-md  px-3 border gap-8  mx-4
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors 
                ${isActive ? "primary-gradient" : ""}

                `}
              >
                <div className="flex gap-3">
                  <Image
                    src={items.imgURL}
                    alt={items.label}
                    width={23}
                    height={23}
                    className="invert-colors"
                  />
                  <p className="">{items.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <SignedIn>
          <div className="border bottom-0  mt-9 ml-10   absolute">
            <Link href={"/"} className="flex">
              <Image
                src={"assets/icons/arrow-left.svg"}
                alt="logout"
                width={23}
                height={23}
                className=""
              />
              <p>logout</p>
            </Link>
          </div>
        </SignedIn>
        {/* <SignedOut>
          <div>
            <Link href={"/sign-in"}>
              <Button
                variant="outline"
                className="small-medium focus:outline-none  focus:ring-0 bg-transparent  text-gray-800 hover:bg-gray-200 w-full border border-gray-300 px-4 py-2 rounded min-h-[41px] "
              >
                <span className="text-amber-700"> LOG IN</span>
              </Button>
            </Link>
          </div>
        </SignedOut> */}
      </div>
    </>
  );
};

export default LeftSideBar;
