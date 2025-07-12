import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "../RenderTags";

const Rightsidebar = () => {
  const hotQuestions = [
    { id: 1, title: "how do i use custom as a class in Next.js" },
    { id: 4, title: "how to do that" },
    { id: 3, title: "how to do that" },
    { id: 2, title: "how to do that" },
  ];

  const Tags = [
    { id: 1, name: "tag1", questions: 3 },
    { id: 2, name: "tag1", questions: 3 },
    { id: 3, name: "tag1", questions: 3 },
    { id: 4, name: "tag1", questions: 3 },
    { id: 5, name: "tag1", questions: 3 },
  ];

  return (
    <section
      className="border-l flex light-border custom-scrollbar fixed right-0  top-0
                  sm:block w-[250px] h-screen overflow-y-auto p-6 pt-36
                 background-light900_dark300 dark:shadow-none max-xl:hidden flex-col"
    >
      <div className="h3-bold text-dark300_light900">Top Questions</div>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((q) => (
          <Link
            href={`/questions/${q.id}`}
            key={q.id}
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <p className="body-medium text-dark400_light700">{q.title}</p>
            <Image
              src={"assets/icons/chevron-right.svg"}
              alt="chevron"
              width={20}
              height={20}
            />
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="h3-bold text-dark300_light900">Popular Tags</div>
        <div className="flex flex-col gap-2 mt-4">
          {Tags.map((item) => (
            <RenderTags
              key={item.id}
              id={item.id}
              name={item.name}
              questions={item.questions}
              showQuestions
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rightsidebar;
