"use server";
import { revalidatePath } from "next/cache";
import { Prisma, PrismaClient } from "../generated/prisma";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";

const prisma = new PrismaClient();
export async function getUserById(params: any) {
  try {
    const { userId } = params;
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    return user;
  } catch (e) {
    console.log(e);
  }
}
export async function createUser(userParams: CreateUserParams) {
  try {
    const newUser = await prisma.user.create({
      data: userParams,
    });
    return newUser;
  } catch (e) {
    console.log(e);
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    const { clerkId, updateData, path } = params;
    await prisma.user.update({
      where: { id: clerkId },
      data: updateData,
    });
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    const { clerkId } = params;
    const user = await prisma.user.findFirst({
      where: { id: clerkId },
    });
    if (!user) {
      throw new Error("no such user ");
    }

    const userQuestionIds = await prisma.question
      .findMany({
        where: { authorId: user.id },
        select: { id: true },
      })
      .then((questions) => questions.map((q) => q.id));

    await prisma.question.deleteMany({
      where: { authorId: user.id },
    });
    const deletedUser = await prisma.user.delete({
      where: { id: user.id },
    });

    //revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}
