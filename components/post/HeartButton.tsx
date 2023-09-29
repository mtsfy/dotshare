"use client";

import useLike from "@/hooks/useLike";
import { SafeUser } from "@/types";
import { User } from "@prisma/client";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PulseLoader } from "react-spinners";

interface HeartButtonProps {
  postId: string;
  currentUser: User;
  white?: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  postId,
  currentUser,
  white,
}) => {
  const { hasLiked, toggleLike, isLoading } = useLike({ postId, currentUser });
  return (
    <div
      className="relative transition hover:opacity-80 cursor-pointer"
      onClick={toggleLike}
    >
      {isLoading ? (
        <PulseLoader size={10} color={white ? "white" : "black"} />
      ) : white ? (
        <>
          <GoHeart
            size={32}
            className={
              hasLiked
                ? "fill-none absolute -top-[1px] -right-[1px]"
                : "fill-white absolute -top-[1px] -right-[1px]"
            }
          />
          <GoHeartFill
            size={32}
            className={hasLiked ? "fill-white" : "fill-none"}
          />
        </>
      ) : (
        <>
          <GoHeart
            size={28}
            className={
              hasLiked
                ? "fill-none absolute -top-[1px] -right-[1px]"
                : "fill-black absolute -top-[1px] -right-[1px]"
            }
          />
          <GoHeartFill
            size={28}
            className={hasLiked ? "fill-red-600" : "fill-none"}
          />
        </>
      )}
    </div>
  );
};

export default HeartButton;
