"use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";
export default function Page() {
  return (
    <div className="flex flex-col justify-center h-screen w-screen  items-center">
      <SignUp />
    </div>
  );
}
