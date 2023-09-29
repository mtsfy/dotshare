"use client";

import Heading from "@/components/Heading";
import UserCard from "@/components/UserCard";
import { Post, User } from "@prisma/client";
import React, { FC } from "react";

interface FollowersClientProps {
  currentUser: User;
  followingList: {
    image: string | null;
    username: string;
    id: string;
    name: string | null;
    category: string;
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
}
const FollowersClient: FC<FollowersClientProps> = ({
  followingList,
  profile,
  currentUser,
}) => {
  if (followingList.length === 0) {
    return (
      <div className="w-3xl">
        <div className="mb-8">
          <Heading
            title="Followers"
            subtitle={`Users following @${profile?.username}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-3xl">
      <div className="mb-8">
        <Heading
          title="Followers"
          subtitle={`Users following @${profile?.username}`}
        />
      </div>
      <div className="bg-neutral-200/50 p-4 rounded-lg">
        {followingList.map((user: any) => (
          <UserCard currentUser={currentUser} key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FollowersClient;
