"use client";

import Heading from "@/components/Heading";
import UserCard from "@/components/UserCard";
import React, { FC } from "react";

interface FollowersClientProps {
  currentUser: Record<string, any>;
  followingList: Record<string, any>[];
  profile: Record<string, any> | null;
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
