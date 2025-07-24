import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/Actions/UserAction";
import { auth } from "@clerk/nextjs/server";

import { RedirectType, redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId }: any = auth();
  // const userId = "";
  if (!userId) redirect("/sign-in");
  const prismaUser: any = await getUserById({ userId });
  console.log(prismaUser);

  return (
    <div>
      <h1 className="h1-bold  text-dark100_light900">All questions</h1>
      <Question prismaUserId={JSON.stringify(prismaUser.id)} />
    </div>
  );
};

export default page;
