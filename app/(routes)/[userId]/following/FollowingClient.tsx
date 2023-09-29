"use client";

import Heading from "@/components/Heading";
import UserCard from "@/components/UserCard";
import React, { FC } from "react";

interface FollowingClientProps {
  followingList: Record<string, any>[];
  profile: Record<string, any> | null;
  currentUser: Record<string, any>;
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
        {followingList.map((user: any) => (
          <UserCard key={user.id} currentUser={currentUser} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FollowingClient;
