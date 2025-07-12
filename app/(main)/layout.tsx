import LeftSideBar from "@/components/shared/Leftsidebar/LeftSideBar";
import Navbar from "@/components/shared/navbar/Navbar";
import Rightsidebar from "@/components/shared/righsidebar/Rightsidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" min-h-screen  w-full relative dark:bg-dark-200">
      <Navbar />
      <div className="flex  flex-row ">
        <LeftSideBar />
        <section className="flex min-h-screen flex-col flex-1  px-6 pb-6  pt-36 max-md:pt-14  sm:px-14">
          <div className="lg:mx-55 sm:ml-15 sm:mr-50   max-md:mt-30   max-w-3xl">
            {children}
          </div>
        </section>
        <Rightsidebar />
      </div>
      Toaster
    </main>
  );
};

export default Layout;
