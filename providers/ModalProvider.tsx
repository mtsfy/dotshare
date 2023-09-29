"use client";

import CreatePostModal from "@/components/modals/CreatePostModal";
import DeletePostModal from "@/components/modals/DeletePostModal";
import SignInModal from "@/components/modals/SignInModal";
import SignUpModal from "@/components/modals/SignUpModal";
import { useEffect, useState } from "react";

interface ModalProviderProps {}

export const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <DeletePostModal />
      <SignInModal />
      <SignUpModal />
      <CreatePostModal />
    </div>
  );
};
