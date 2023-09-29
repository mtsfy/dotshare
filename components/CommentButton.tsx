"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { GoCommentDiscussion } from "react-icons/go";

interface CommentButtonProps {
  postId: string;
  currentUser: User;
  active: boolean;
}

const CommentButton: React.FC<CommentButtonProps> = ({
  postId,
  currentUser,
  active = true,
}) => {
  const router = useRouter();
  return (
    active && (
      <div
        className="relative transition hover:opacity-80 cursor-pointer"
        onClick={() => router.push(`/post/${postId}#content`)}
      >
        <GoCommentDiscussion size={25} />
      </div>
    )
  );
};

export default CommentButton;
