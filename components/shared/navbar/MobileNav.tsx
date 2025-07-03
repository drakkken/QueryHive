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
import Image from "next/image";
import Link from "next/link";

function NavContent() {
  return <div>NavContent</div>;
}

const MobileNavigation = async () => {
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
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Button className="small-medium btn-secondary min-h-[41px] ww-full">
                    <span className="text-amber-700"> LOG IN</span>
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
