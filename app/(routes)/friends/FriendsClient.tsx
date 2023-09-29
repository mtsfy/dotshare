"use client";

import Heading from "@/components/Heading";
import UserCard from "@/components/UserCard";
import Button from "@/components/inputs/Button";
import { SafeUser } from "@/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { GoPeople } from "react-icons/go";

interface FriendsClientProps {
  friends: Record<string, any>[];
  currentUser: SafeUser;
}
const FriendsClient: React.FC<FriendsClientProps> = ({
  friends,
  currentUser,
}) => {
  const router = useRouter();
  if (friends.length === 0) {
    return (
      <div className="w-3xl flex flex-col items-center pt-32">
        <GoPeople size={50} />
        <div className="mt-2 font-bold text-2xl">No friends to show.</div>
        {/* <div className="font-semibold text-neutral-500 text-lg">
          No result found.
        </div> */}
        <div className="mt-8 w-80">
          <Button
            label="Find Friends"
            className=""
            onClick={() => router.push(`/${currentUser.id}/followers`)}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-3xl">
        <div className="mb-8">
          <Heading title="Friends" subtitle="You both follow each other." />
        </div>
        <div className="bg-neutral-200/50 p-4 rounded-lg">
          {friends.map((friend: any) => (
            <UserCard key={friend.id} user={friend} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendsClient;
