"use client";

import Avatar from "@/components/Avatar";
import CommentButton from "@/components/CommentButton";
import Button from "@/components/inputs/Button";
import Input from "@/components/inputs/Input";
import HeartButton from "@/components/post/HeartButton";
import SaveButton from "@/components/post/SaveButton";
import { SafeUser } from "@/types";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  GoDot,
  GoDotFill,
  GoKebabHorizontal,
  GoScreenFull,
} from "react-icons/go";
import { formatTimeAgo } from "@/libs/utils";
import FollowButton from "@/components/FollowButton";
import useDeletePostModal from "@/hooks/useDeletePostModal";

interface PostClientProps {
  post: Record<string, any>;
  currentUser: SafeUser;
}

const PostClient: React.FC<PostClientProps> = ({ post, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const deletePostModal = useDeletePostModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    router.push(`/post/${post.id}`);
    deletePostModal.onOpen();
  };
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post(`/api/comments/${post.id}`, data)
      .then(() => {
        toast.success("Comment posted.");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      {/* outer div */}
      <div className="flex md:items-center flex-col gap-3 md:gap-8  md:justify-center md:flex-1">
        {/* image and user name */}
        <div className="relative sm:min-h-[500px] md:w-[650px] aspect-square h-auto">
          <div className=" absolute block  w-full">
            <div className="flex p-2 items-center">
              <div className="flex items-center w-full justify-between">
                <div
                  onClick={() => router.push(`/${post.user.id}`)}
                  className="cursor-pointer flex items-center"
                >
                  <CldImage
                    crop="fill"
                    width={45}
                    height={45}
                    src={post.user.image}
                    alt="pfp"
                    className="object-cover object-center rounded-full"
                  />
                  <span className="font-bold pl-2 hover:opacity-60 cursor-pointer transition ">
                    {post.user.username}
                  </span>
                </div>

                {currentUser.id !== post.user.id ? (
                  <div className="flex items-center ">
                    {/* <span className="p-2 ">
                      <GoDotFill size="7" />
                    </span> */}
                    <FollowButton
                      currentUser={currentUser}
                      userId={post.user.id}
                    />
                  </div>
                ) : (
                  <div className="relative inline-block text-left z-10">
                    <div className="cursor-pointer" onClick={toggleOptions}>
                      <GoKebabHorizontal size={24} />
                    </div>

                    {isOpen && (
                      <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-lg shadow-lg w-44">
                        <div className="pt-2 pb-2 flex flex-col gap-2">
                          {currentUser.id !== post.user.id && (
                            <>
                              <div className="w-fit pl-3">
                                <FollowButton
                                  userId={post.user.id}
                                  currentUser={currentUser}
                                />
                              </div>
                              <div className="h-[1px] bg-neutral-300/50 w-full rounded-full" />
                              <div className="pl-3 pt-2 pb-2  cursor-pointer hover:opacity-80 font-base  ">
                                Add to favorites
                              </div>
                              <div className="h-[1px] bg-neutral-300/50 w-full rounded-full" />

                              <div className="pl-3 pt-2 pb-2 cursor-pointer hover:opacity-80 font-base  ">
                                Go to Post
                              </div>
                              <div className="h-[1px] bg-neutral-300/50 w-full rounded-full" />

                              <div className="pl-3 pt-2 pb-2 cursor-pointer hover:opacity-80 font-base  ">
                                Copy link
                              </div>
                              <div className="h-[1px] bg-neutral-300/50 w-full rounded-full" />
                            </>
                          )}

                          {currentUser.id === post.user.id && (
                            <>
                              <div
                                onClick={() => handleDelete()}
                                className="pl-3 pt-2 pb-2  cursor-pointer hover:opacity-80 font-base text-red-500  "
                              >
                                Delete
                              </div>
                              <div className="h-[1px] bg-neutral-300/50 w-full rounded-full" />
                              <div
                                onClick={() =>
                                  router.push(`/post/${post.id}/edit`)
                                }
                                className="pl-3 pt-2 pb-2  cursor-pointer hover:opacity-80 font-base   "
                              >
                                Edit
                              </div>
                              <div className="h-[1px] bg-neutral-300/50 w-full rounded-full" />
                            </>
                          )}

                          <div
                            className="pl-3 pt-2 pb-2 cursor-pointer hover:opacity-80 font-base  "
                            onClick={() => setIsOpen(false)}
                          >
                            Cancel
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* image */}
          <div className="">
            <CldImage
              src={post.imageSrc}
              fill
              className="
            
            inset-0 
            object-contain 
           
            
            mt-16
            sm:mt-0 
            rounded-b-md
            md:rounded-b-md
            sm:rounded-none 
            
            md:mt-16

            

            
            "
              alt="Image"
            />
          </div>
        </div>

        <div className="pb-2 pt-4 h-10 sm:mt-0 md:mt-8 mt-12">
          {/* likes and comments and save buttons */}
          <div className=" mb-1 flex justify-between">
            <div className="flex gap-3 items-center">
              <div className="text-center">
                <HeartButton postId={post.id} currentUser={currentUser} />
                {post.likeIds.length}
              </div>
              <div className="text-center">
                <CommentButton postId={post.id} currentUser={currentUser} />
                {post.comments.length}
              </div>
            </div>
            <div>
              <SaveButton postId={post.id} currentUser={currentUser} />
            </div>
          </div>
          {/* username and caption */}
          <div className="flex gap items-center gap-3">
            <div
              className="font-bold hover:opacity-80 transition cursor-pointer"
              onClick={() => router.push(`/${post.user.id}`)}
            >
              {post.user.username}
            </div>
            <div>
              <span className="font-medium">{post.caption}</span>
            </div>
          </div>

          {/* comments */}
          <div id="comment" className="">
            <div className="text-center  font-bold mt-2">Comments</div>
            {post.comments.length > 0 ? (
              <>
                <div
                  id=""
                  className="flex flex-col bg-neutral-500/10 max-w-2xl mx-auto h-96 rounded-lg p-3 mt-2 gap-2 overflow-x-auto "
                >
                  {post.comments.map((comment: any) => (
                    <div key={comment.id}>
                      <div className="flex justify-between  text-bold items-center">
                        <div className="flex flex-col w-full gap-2 ">
                          <div className="flex items-center gap-2">
                            <span
                              onClick={() => router.push(`/${comment.user.id}`)}
                              className="font-bold text-sm hover:opacity-80 transition cursor-pointer"
                            >
                              @{comment.user.username}
                            </span>

                            <div className="text-sm font-medium text-neutral-400">
                              {formatTimeAgo(comment.createdAt)}
                            </div>
                          </div>

                          <div className="">{comment.content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <Input
                    type="text"
                    disabled={isLoading}
                    id="content"
                    label="Comment"
                    register={register}
                    errors={errors}
                    className=""
                  />
                  <Button label="Comment" onClick={handleSubmit(onSubmit)} />
                </div>
              </>
            ) : (
              // No comments
              <div>
                <div className="flex flex-col bg-neutral-500/10 h-96 rounded-lg p-3 mt-2 gap-2 overflow-x-auto">
                  <div className="flex gap-2 flex-col text-center ">
                    <h1 className="font-bold">Be the first</h1>
                    <div className="flex flex-col gap-3 mt-3">
                      <Input
                        type="text"
                        disabled={isLoading}
                        id="content"
                        label="Comment"
                        register={register}
                        errors={errors}
                        className=""
                      />
                      <Button
                        label="Comment"
                        onClick={handleSubmit(onSubmit)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* more by user */}
          <div className="mt-4">
            <span className="font-bold mt-3">More by {post.user.name}</span>
            <div className="grid grid-cols-3 gap-4 overflow pb-20 mt-2">
              <CldImage
                src={post.imageSrc}
                width={200}
                height={200}
                className="aspect-square object-cover object-top"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostClient;
