import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="  relative">
      <Navbar />
      <div className="flex">
        leftside bar
        <section className="flex min-h-screen flex-col flex-1 px-6 pb-6 pt-36 max-md:-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        rightsidebar
      </div>
      Toaster
    </main>
  );
};

export default Layout;
