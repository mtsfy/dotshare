"use client";
import useSave from "@/hooks/useSave";
import { PulseLoader } from "react-spinners";
import React, { FC } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { User } from "@prisma/client";

interface SaveButtonProps {
  postId: string;
  currentUser: User;
  white?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  postId,
  currentUser,
  white,
}) => {
  const { hasSaved, toggleSave, isLoading } = useSave({ postId, currentUser });
  return (
    <div
      className="relative transition hover:opacity-80 cursor-pointer"
      onClick={toggleSave}
    >
      {isLoading ? (
        <PulseLoader size={10} color={white ? "white" : "black"} />
      ) : white ? (
        <>
          <GoBookmark
            size={28}
            className={
              hasSaved
                ? "fill-none absolute -top-[1px] -right-[1px]"
                : "fill-white absolute -top-[1px] -right-[1px]"
            }
          />
          <GoBookmarkFill
            size={28}
            className={hasSaved ? "fill-white" : "fill-none"}
          />
        </>
      ) : (
        <>
          <GoBookmark
            size={28}
            className={
              hasSaved
                ? "fill-none absolute -top-[1px] -right-[1px]"
                : "fill-black absolute -top-[1px] -right-[1px]"
            }
          />
          <GoBookmarkFill
            size={28}
            className={hasSaved ? "fill-normal" : "fill-none"}
          />
        </>
      )}
    </div>
  );
};

export default SaveButton;
