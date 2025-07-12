import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface props {
  id: number;
  showQuestions?: boolean;
  name: string;
  questions?: number;
}

const RenderTags = ({ id, showQuestions, name, questions }: props) => {
  return (
    <div>
      <Link href={`/tags/${id}`} className="flex justify-between gap-2">
        <Badge className="subtle-medium  background-light800_dark300 text-light400_light500  border-none rounded-md px-4 py-2 uppercase">
          {name}
        </Badge>
        {showQuestions && (
          <p className="small-medium text-dark500_light700 ">{questions}</p>
        )}
      </Link>
    </div>
  );
};

export default RenderTags;
