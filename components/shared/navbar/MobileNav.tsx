"use client";
import { sidebarLinks } from "@/app/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import { Ghost } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavContent() {
  const pathName = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 ">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName == item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={`${item.route}`}
              className={`${
                isActive
                  ? "rounded-lg text-light-900 primary-gradient "
                  : "text-dark300_light900 "
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={23}
                height={23}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
}

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"assets/icons/hamburger.svg"}
          alt="hamburger"
          width={30}
          height={50}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1  w-[90%] h-[10vh] ">
          <Image
            src="assets/images/site-logo.svg"
            width={30}
            height={23}
            alt="Logo"
          />
          <h1>
            Dev<span className="   text-amber-700">Flow</span>
          </h1>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-2">
              <SheetClose
                className="   flex items-center justify-center mx-3"
                asChild
              >
                <Link href={"/sign-in"}>
                  <Button
                    variant="outline"
                    className="small-medium focus:outline-none  focus:ring-0 bg-transparent  text-gray-800 hover:bg-gray-200 w-full border border-gray-300 px-4 py-2 rounded min-h-[41px] "
                  >
                    <span className="text-amber-700"> LOG IN</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose
                className="   flex items-center justify-center mx-3"
                asChild
              >
                <Link href={"/sign-up"}>
                  <Button
                    variant="outline"
                    className="small-medium bg-transparent focus:outline-none  focus:ring-0 text-gray-800 hover:bg-gray-200 w-full border border-gray-300 px-4 py-2 rounded min-h-[41px] "
                  >
                    <span className="text-amber-700"> SIGN UP</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
