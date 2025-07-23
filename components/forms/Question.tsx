"use client";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { QuestionSchema } from "@/lib/validations";

import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/Actions/question.action";
import { useRouter, usePathname } from "next/navigation";

const type: any = "create";

const Question = ({ prismaUserId }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resolvedTheme } = useTheme();
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    // console.log("onSubmit call22222ed");
    setIsSubmitting(true);
    try {
      // make an async call to ap i to creat a questin
      // it must contain all form data
      // thennrenavigate to home
      //  console.log("mewo");
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        authorId: JSON.parse(prismaUserId),
      });

      router.push("/");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    console.log(field, e);
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 calueharacters ",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = ``;
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  const handleTagRemove = (tag: string, field: any) => {
    const newTag = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTag);
  };
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title<span className="text-primary">*</span>
              </FormLabel>
              <FormControl className="mt-3  ">
                <Input
                  className="not-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2 text-light-500">
                Be specific and image you are asking question to another person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3 ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed Explanation of your problem{" "}
                <span className="text-primary">*</span>
              </FormLabel>
              <FormControl className="mt-3  "></FormControl>
              <FormDescription className="body-regular mt-2 text-light-500">
                Introduce the problem and expland on what you put in the tite
              </FormDescription>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                value={field.value}
                onEditorChange={(content) => field.onChange(content)}
                initialValue="<p>Give your desciption here.</p>"
                init={{
                  height: 500,
                  // skin: resolvedTheme === "dark" ? "oxide-dark" : "oxide",
                  // content_css: resolvedTheme === "dark" ? "dark" : "default",

                  content_css: "dark",
                  skin: "oxide-dark",
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "codesample", // Add this plugin
                  ],
                  toolbar:
                    "undo redo | blocks | codesample | bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style: "body { font-family:Inter; font-size:14px }",
                }}
              />
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags<span className="text-primary">*</span>
              </FormLabel>
              <FormControl className="mt-3  ">
                {/* <> */}
                <div>
                  <Input
                    className="not-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add Tags... "
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex mt-2 gap-2">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium  px-4 py-2 gap-2 flex justify-center items-center"
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="close icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert dark:invert-0"
                            onClick={() => {
                              handleTagRemove(tag, field);
                            }}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                {/* </> */}
              </FormControl>
              <FormDescription className="body-regular mt-2 text-light-500">
                YOu can add upto 3 tags
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit  !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editting..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question " : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
