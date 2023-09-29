"use client";

import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import FollowButton from "./FollowButton";
import { SafeUser } from "@/types";

interface UserCardProps {
  user: Record<string, any>;
  currentUser?: SafeUser;
}

const UserCard: React.FC<UserCardProps> = ({ user, currentUser }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex w-full items-center gap-4 justify-between">
        <div
          className="flex gap-2 p-2 items-center hover:opacity-80 transition cursor-pointer "
          onClick={() => router.push(`/${user.id}`)}
        >
          <div>
            <CldImage
              src={user.image}
              width={50}
              height={50}
              crop="fill"
              alt="pfp"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col ml-2">
            <span className="font-bold">@{user.username}</span>
            <span className="font-light text-base">{user.category}</span>
            {/* <span>{user.createdAt()}</span> */}
          </div>
        </div>
        {currentUser && currentUser.id !== user.id ? (
          <FollowButton currentUser={currentUser} userId={user.id} />
        ) : null}
        {/* <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <div className="font-bold">{user.followingIDs.length}</div>
            <span>following</span>
          </div>
          <div className="flex gap-2">
            <div className="font-bold">{user.followedByIDs.length}</div>
            <span>followers</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default UserCard;
