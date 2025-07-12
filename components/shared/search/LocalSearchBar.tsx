"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const LocalSearchBar = ({
  imgPlace,
  route,
  placeholder,
  otherClasses,
  imgSrc,
}: any) => {
  return (
    <div
      className={`${otherClasses} items-center  rounded-[10px] px-4 background-light800_darkgradient grow flex `}
    >
      {imgPlace === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={23}
          height={23}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        className="paragraph-regular dark:bg-dark-200 border-none background-light800_darkgradient border-0 ring-0 focus:ring-0 focus:border-0 no-focus placeholder shadow-none outline-none"
        value={""}
        onChange={() => {}}
      />
      {imgPlace === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={23}
          height={23}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
