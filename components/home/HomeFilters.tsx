"use client";
import { HomePageFilters } from "@/app/constants/filter";
import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const HomeFilters = () => {
  let active = "frequent";

  return (
    <div className="mt-5 flex-wrap md:flex gap-3 ">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-[#fff1e6]   dark:bg-dark-400  text-[#ff7000]"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
