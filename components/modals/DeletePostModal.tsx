"use client";

import useDeletePostModal from "@/hooks/useDeletePostModal";
import Modal from "./Modal";
import { useState } from "react";
import usePost from "@/hooks/usePost";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeletePostModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const deletePostModal = useDeletePostModal();
  const { postId } = usePost();
  const router = useRouter();

  const bodyContent = (
    <>
      <div className="items-center justify-center flex flex-col w-full h-full">
        <div
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <div className="mt-2">
            <p className="text-lg text-gray-500">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const onSubmit = () => {
    setIsLoading(true);
    // console.log(postId);
    axios
      .delete(`/api/posts`, { data: { postId } })
      .then(() => {
        toast.success("Post deleted successfully.");
        router.refresh();
        deletePostModal.onClose();
        router.push("/");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={deletePostModal.isOpen}
      onClose={deletePostModal.onClose}
      onSubmit={() => onSubmit()}
      actionLabel="Delete Post"
      secondaryActionLabel="Cancel"
      secondaryAction={() => deletePostModal.onClose()}
      title="Delete Post"
      body={bodyContent}
    />
  );
};

export default DeletePostModal;
