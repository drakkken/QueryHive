import Link from "next/link";
import { stringify } from "querystring";
import React from "react";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import { auth } from "@clerk/nextjs/server";
import { formatNumber, getTimeStamp } from "@/lib/utils";
interface QuestionProps {
  id: string;
  title: string;
  tags: {
    id: string;
    name: string;
  }[];
  author: {
    id: string;
    name: string;
    picture: string;
  };
  upvote: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  id,
  title,
  tags,
  author,
  upvote,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 smL:flex-row">
        <div className="flex-1 ">
          <span className="subtle-regular  text-dark400_light500 line-clamp-1 flex sm:hidden">
            {getTimeStamp(new Date(createdAt))}
          </span>

          <Link href={`questions/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900  line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* if signed in add delete actions lallalal */}
      </div>
      <div className="mt-3.5 flex flex-wrap  gap-2 ">
        {tags.map((item) => (
          <RenderTags
            classname2={"background-dark400_light900"}
            key={item.id}
            id={item.id}
            name={item.name}
          />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Metric
          imgUrl={"/assets/icons/avatar.svg"}
          alt="user"
          value={author.name}
          title={`-${getTimeStamp(createdAt)}`}
          href={`/profile/${author.id}`}
          isAuthor
          textStyles="body-medium  text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upvote)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="messafe"
          value={formatNumber(answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatNumber(views)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
