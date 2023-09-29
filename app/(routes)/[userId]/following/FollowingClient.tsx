"use client";

import Heading from "@/components/Heading";
import UserCard from "@/components/UserCard";
import { Post, User } from "@prisma/client";
import React, { FC } from "react";

interface FollowingClientProps {
  followingList: {
    image: string | null;
    id: string;
    name: string | null;
    category: string;
    username: string;
    followedByIDs: string[];
    followingIDs: string[];
  }[];
  profile: {
    image: string | null;
    id: string;
    name: string | null;
    category: string;
    bio: string | null;
    followedByIDs: string[];
    followingIDs: string[];
    username: string;
    posts: Post[];
  };
  currentUser: User;
}
const FollowingClient: FC<FollowingClientProps> = ({
  followingList,
  profile,
  currentUser,
}) => {
  if (followingList.length === 0) {
    return (
      <div className="w-3xl">
        <div className="mb-8">
          <Heading
            title="Following"
            subtitle={`Users @${profile?.username} follows`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-3xl">
      <div className="mb-8">
        <Heading
          title="Following"
          subtitle={`Users @${profile?.username} follows`}
        />
      </div>
      <div className="bg-neutral-200/50 p-4 rounded-lg">
        {followingList.map((user) => (
          <UserCard key={user.id} currentUser={currentUser} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FollowingClient;
