"use client";

import { CldImage } from "next-cloudinary";
import { GoKebabHorizontal } from "react-icons/go";
import Heading from "../Heading";
import HeartButton from "./HeartButton";
import SaveButton from "./SaveButton";
import CommentButton from "../CommentButton";
import { useRouter } from "next/navigation";
import { formatTimeAgo } from "@/libs/utils";
import { useState } from "react";
import FollowButton from "../FollowButton";
import useDeletePostModal from "@/hooks/useDeletePostModal";
interface PostCardProps {
  data: Record<string, any>;
  currentUser: Record<string, any>;
}

const PostCard: React.FC<PostCardProps> = ({ data, currentUser }) => {
  const router = useRouter();
  // console.log(currentUser);
  const deletePostModal = useDeletePostModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    router.push(`/post/${data.id}`);
    deletePostModal.onOpen();
  };

  return (
    <div>
      {/* Top: Username, Date, and three dot menu */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => router.push(`${data.user.id}`)}
          className="flex gap-3 items-center cursor-pointer"
        >
          <div>
            <CldImage
              src={data.user.image}
              width={50}
              height={50}
              crop="fill"
              alt="pfp"
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold">{data.user.username}</div>
            <div className="font-medium text-sm text-neutral-400">
              {formatTimeAgo(data.createdAt)}
            </div>
          </div>
        </div>
        <div className="relative inline-block text-left">
          <div className="cursor-pointer" onClick={toggleOptions}>
            <GoKebabHorizontal size={24} />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-lg shadow-lg w-44">
              <div className="pt-2 pb-2 flex flex-col gap-2">
                {currentUser.id !== data.user.id && (
                  <>
                    <div className="w-fit pl-3">
                      <FollowButton
                        userId={data.user.id}
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

                {currentUser.id === data.user.id && (
                  <>
                    <div
                      onClick={() => handleDelete()}
                      className="pl-3 pt-2 pb-2  cursor-pointer hover:opacity-80 font-base text-red-500  "
                    >
                      Delete
                    </div>
                    <div className="h-[1px] bg-neutral-300/50 w-full rounded-full" />
                    <div
                      onClick={() => router.push(`/post/${data.id}/edit`)}
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
      </div>
      {/* Image content with title */}
      <div onClick={() => router.push(`/post/${data.id}`)} className="">
        <div className="mt-2 mb-2">
          <Heading title={data.title} />
        </div>
        <CldImage
          src={data.imageSrc}
          crop="fill"
          width="1080"
          height="1080"
          quality="100"
          alt="image"
          className="border-[1px] rounded-md cursor-pointer"
        />
      </div>
      {/* Buttons: like, comment, share */}
      <div className="flex items-center justify-between mt-3 mb-2">
        <div className="flex gap-4">
          <HeartButton postId={data.id} currentUser={currentUser} />
          {/* {data.likeIds.length} */}
          <CommentButton postId={data.id} currentUser={currentUser} />
          {/* {data.comments.length} */}
        </div>
        <SaveButton postId={data.id} currentUser={currentUser} />
      </div>
      <span className="font-bold">{data.likeIds.length} likes</span>
      {/* Username and caption */}
      <div className="flex items-center gap-2 mt-1">
        <div
          onClick={() => router.push(data.user.id)}
          className="text-base font-semibold hover:opacity-60 cursor-pointer"
        >
          {data.user.username}
        </div>
        <div className="font-medium text-md">{data.caption}</div>
      </div>
      {data.comments.length > 0 && (
        <div
          onClick={() => router.push(`/post/${data.id}#comment`)}
          className="mt-1 hover:opacity-80 cursor-pointer"
        >
          {data.comments.length === 1 && (
            <span className="text-base text-neutral-500">
              View {data.comments.length} comment
            </span>
          )}
          {data.comments.length > 1 && (
            <span className="text-base text-neutral-500">
              View all {data.comments.length} comments
            </span>
          )}
        </div>
      )}
      <hr className="w-full mt-6" />
    </div>
  );
};

export default PostCard;
