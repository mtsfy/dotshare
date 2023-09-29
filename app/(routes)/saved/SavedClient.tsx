"use client";

import Heading from "@/components/Heading";
import SavedCard from "@/components/SavedCard";
import Button from "@/components/inputs/Button";
import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { GoBookmark } from "react-icons/go";

interface SavedClientProps {
  posts: Post[];
  currentUser: User;
}

const SavedClient: React.FC<SavedClientProps> = ({ posts, currentUser }) => {
  const router = useRouter();
  // TODO: CREATE  COMPONENT FOR EMPTY LIKES AND SAVED
  if (posts.length === 0) {
    return (
      <div className="w-3xl flex flex-col items-center pt-32">
        <GoBookmark size={50} />
        <div className="mt-2 font-bold text-2xl">
          You&apos;ve not saved any posts.
        </div>
        {/* <div className="font-semibold text-neutral-500 text-lg">
          No result found.
        </div> */}
        <div className="mt-8 w-80">
          <Button
            label="Explore posts"
            className=""
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="p-2">
        <Heading title="Saved" subtitle="Posts you've boomarked." />
      </div>
      <div
        className="
      mt-10
      
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-5
     gap-4
     pb-16
      
      "
      >
        {posts.map((post) => (
          <>
            <SavedCard key={post.id} data={post} currentUser={currentUser} />
          </>
        ))}
      </div>
    </>
  );
};

export default SavedClient;
