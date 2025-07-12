import { HomePageFilters } from "@/app/constants/filter";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="  flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>
        <Link
          href={"/ask-question"}
          className="flex justify-end  w- max-sm:w-full  "
        >
          <Button className="primary-gradient min-h-[46]  !text-light-900   px-4 py-3 ">
            ask a question
          </Button>
        </Link>
      </div>
      <div className="mt-9    flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          imgPlace="left"
          placeholder="searchbar"
          otherClasses="flexs-1 h-[8vh]"
          imgSrc="assets/icons/search.svg"
        />
        <Filter
          filter={HomePageFilters}
          otherClasses="min-h-[46px] sm:min-w-[100px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
    </>
  );
};

export default page;
