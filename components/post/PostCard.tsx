"use client";

import { CldImage } from "next-cloudinary";
import { GoCommentDiscussion, GoKebabHorizontal } from "react-icons/go";
import Heading from "../Heading";
import HeartButton from "./HeartButton";
import SaveButton from "./SaveButton";
import CommentButton from "../CommentButton";
import { useRouter } from "next/navigation";
import { formatTimeAgo } from "@/libs/utils";
import { useState } from "react";
import FollowButton from "../FollowButton";
import useDeletePostModal from "@/hooks/useDeletePostModal";
import { Post, User, Comment as CommentType } from "@prisma/client";
interface PostCardProps {
  post: Post & {
    user: {
      image: string | null;
      id: string;
      name: string | null;
      username: string;
    };
    comments: CommentType[];
  };
  currentUser: User;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const router = useRouter();
  console.log(currentUser);
  const deletePostModal = useDeletePostModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    router.push(`/post/${post.id}`);
    deletePostModal.onOpen();
  };

  return (
    <div>
      {/* Top: Username, Date, and three dot menu */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => router.push(`${post.user.id}`)}
          className="flex gap-3 items-center cursor-pointer"
        >
          {post.user.image && (
            <div>
              <CldImage
                src={post.user.image}
                width={50}
                height={50}
                crop="fill"
                alt="pfp"
                className="rounded-full object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-bold">{post.user.username}</div>
            <div className="font-medium text-sm text-neutral-400">
              {formatTimeAgo(post.createdAt)}
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
                      onClick={() => router.push(`/post/${post.id}/edit`)}
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
      <div onClick={() => router.push(`/post/${post.id}`)} className="">
        <div className="mt-2 mb-2">
          <Heading title={post.title} />
        </div>
        <CldImage
          src={post.imageSrc}
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
          <HeartButton postId={post.id} currentUser={currentUser} />
          {/* {post.likeIds.length} */}
          <div
            className="relative transition hover:opacity-80 cursor-pointer"
            onClick={() => router.push(`/post/${post.id}#content`)}
          >
            <GoCommentDiscussion size={25} />
          </div>
          {/* {post.comments.length} */}
        </div>
        <SaveButton postId={post.id} currentUser={currentUser} />
      </div>
      <span className="font-bold">{post.likeIds.length} likes</span>
      {/* Username and caption */}
      <div className="flex items-center gap-2 mt-1">
        <div
          onClick={() => router.push(post.user.id)}
          className="text-base font-semibold hover:opacity-60 cursor-pointer"
        >
          {post.user.username}
        </div>
        <div className="font-medium text-md">{post.caption}</div>
      </div>
      {post.comments.length > 0 && (
        <div
          onClick={() => router.push(`/post/${post.id}#comment`)}
          className="mt-1 hover:opacity-80 cursor-pointer"
        >
          {post.comments.length === 1 && (
            <span className="text-base text-neutral-500">
              View {post.comments.length} comment
            </span>
          )}
          {post.comments.length > 1 && (
            <span className="text-base text-neutral-500">
              View all {post.comments.length} comments
            </span>
          )}
        </div>
      )}
      <hr className="w-full mt-6" />
    </div>
  );
};

export default PostCard;
