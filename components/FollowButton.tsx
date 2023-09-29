"use client";

import useFollow from "@/hooks/useFollow";
import { SafeUser } from "@/types";
import { ScaleLoader } from "react-spinners";

interface FollowButtonProps {
  userId: string;
  currentUser: Record<string, any>;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, currentUser }) => {
  const { isFollowing, toggleFollow, isLoading } = useFollow({
    userId,
    currentUser,
  });
  return (
    <div
      className="relative transition hover:opacity-80 cursor-pointer"
      onClick={toggleFollow}
    >
      {isLoading ? (
        <ScaleLoader height={15} />
      ) : (
        <div className="pt-1 pb-1 pl-4 pr-4 cursor-pointer text-medium transition hover:bg-neutral-500/20 bg-neutral-500/10 font-bold rounded-lg">
          {isFollowing ? "Unfollow" : "Follow"}
        </div>
      )}
    </div>
  );
};

export default FollowButton;
