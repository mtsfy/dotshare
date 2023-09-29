"use client";

import { SafeUser } from "@/types";
import { Post, User } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import Button from "./inputs/Button";
import HeartButton from "./post/HeartButton";
import SaveButton from "./post/SaveButton";
import { useRouter } from "next/navigation";
import CommentButton from "./CommentButton";

interface SavedCardProps {
  data: Post;
  currentUser: Record<string, any>;
  actions?: boolean;
}

const SavedCard: React.FC<SavedCardProps> = ({
  data,
  currentUser,
  actions = true,
}) => {
  const router = useRouter();
  return (
    <div
      className="relative aspect-square cursor-pointer overflow-hidden"
      onClick={() => router.push(`/post/${data.id}`)}
    >
      <div className="absolute inset-0">
        <CldImage
          src={data.imageSrc}
          fill
          alt="Image"
          className="absolute inset-0 object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition hover:bg-neutral-600/60">
          <HeartButton postId={data.id} white currentUser={currentUser} />
          <span className="text-white font-semibold">
            {data.likeIds.length}
          </span>
          {/* <CommentButton postId={data.id} currentUser={currentUser} />
          <span className="text-white font-semibold">
            {data.likeIds.length}
          </span> */}
          {actions && (
            <SaveButton postId={data.id} white currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCard;
