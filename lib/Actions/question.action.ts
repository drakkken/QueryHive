"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "../generated/prisma";
import { GetQuestionsParams } from "./shared.types";

const prisma = new PrismaClient();

export async function getQuestion(params: GetQuestionsParams) {
  try {
    const questions = await prisma.question.findMany({
      include: {
        tags: true,
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { questions };
  } catch (e) {
    console.log(e);
    throw new Error("error");
  }
}

export async function createQuestion(params: any) {
  try {
    const { title, content, tags, authorId /*path*/ } = params;
    // making the question in the databse
    const question = await prisma.question.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    const tagDocuments = [];

    for (const tag of tags) {
      // Case-insensitive search and upsert
      const existingTag = await prisma.tag.upsert({
        where: {
          name: tag.toLowerCase(), // Make it case-insensitive by storing lowercase
        },
        update: {
          questions: { increment: 1 }, // Increment question count
          QuestionList: { connect: { id: question.id } }, // Connect to the question
        },
        create: {
          name: tag.toLowerCase(), // Store as lowercase
          questions: 1, // Initial count
          QuestionList: { connect: { id: question.id } }, // Connect to the question
        },
      });

      tagDocuments.push(existingTag.id);
    }

    await prisma.question.update({
      where: { id: question.id },
      data: {
        tags: {
          connect: tagDocuments.map((tagId) => ({ id: tagId })),
        },
      },
    });

    revalidatePath("/");
    return question;
  } catch (e) {
    console.error("Create question error:", e);
    throw e;
  }
}
