import z from "zod";

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(130, { message: "Title musn't be longer then 130 characters." }),
  explanation: z.string().min(100, {
    message: "Explanation is too short. Minimum 100 characters required.",
  }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
