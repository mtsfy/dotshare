"use client";
import Button from "@/components/inputs/Button";
import Input from "@/components/inputs/Input";
import { User } from "@prisma/client";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GoArrowLeft } from "react-icons/go";

interface EditPostClientProps {
  post: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    imageSrc: string;
    likeIds: string[];
    caption: string;
    title: string;
    userId: string;

    user: {
      id: string;
      name: string | null;
      username: string;
      image: string | null;
    };
    comments: {
      user: {
        id: string;
        name: string | null;
        username: string;
      };
      content: string;
      createdAt: Date;
    }[];
  };
  currentUser: User;
}

const EditPostClient: FC<EditPostClientProps> = ({ post, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      postId: post.id,
      caption: post.caption,
      title: post.title,
      image: post.imageSrc,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .patch("/api/posts", data)
      .then(() => {
        router.refresh();
        toast.success("Post updated successfully.");
        router.push(`/post/${post.id}`);
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const image = watch("image");
  const title = watch("title");
  const caption = watch("caption");

  return (
    <>
      <div
        onClick={() => router.back()}
        className="hover:opacity-80 cursor-pointer transition"
      >
        <GoArrowLeft size={40} />
      </div>
      <div className="mt-4 flex md:items-center flex-col  gap-4 pb-24">
        <div className="">
          <CldImage
            width={600}
            height={600}
            src={post.imageSrc}
            alt="Image"
            className="object-contain "
          />
          <div className="w-full mt-8">
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  label="Title"
                  id="title"
                  className=""
                />
              </div>
              <div>
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  label="Caption"
                  id="caption"
                  className=""
                />
              </div>
              <div>
                <Button
                  disabled={isLoading}
                  label="Done"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPostClient;
