import { HomePageFilters } from "@/app/constants/filter";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const questions = [
  {
    id: "1",
    title:
      "something that does not bother me somtimes in life  i want ot duck my own dick",
    tags: [
      { id: "1", name: "python" },
      { id: "2", name: "sql" },
    ],
    author: {
      id: "1",
      name: "John Doe",
      picture: "https://example.com/profile.jpg",
    },
    upvote: 10,
    views: 100,
    answers: [{}, {}],
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "div centering",
    tags: [
      { id: "1", name: "python" },
      { id: "2", name: "sql" },
    ],
    author: {
      id: "1",
      name: "John Doe",
      picture: "https://example.com/profile.jpg",
    },
    upvote: 10000000000,
    views: 4800599,
    answers: [{}, {}],
    createdAt: new Date(),
  },
];

const page = () => {
  return (
    <>
      <div className="  flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>
        <Link
          href={"/ask-questions"}
          className="flex justify-end  w- max-sm:w-full  "
        >
          <Button className="primary-gradient min-h-[46] cursor-pointer !text-light-900   px-4 py-3 ">
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
      <div className="  mt-10 flex w-full flex-col  gap-6">
        {questions.length > 0 ? (
          questions.map((item) => (
            <div>
              <QuestionCard
                key={item.id}
                id={item.id}
                title={item.title}
                tags={item.tags}
                author={item.author}
                upvote={item.upvote}
                views={item.views}
                answers={item.answers}
                createdAt={item.createdAt}
              />
            </div>
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. Your query could be the next big thing others learn from.
        Get involved! 💡
        "
            link="/ask-question"
            linkTitle="ask a question"
          />
        )}
      </div>
    </>
  );
};

export default page;
