"use client";

import {
  GoHome,
  GoSignOut,
  GoPlus,
  GoBookmark,
  GoPeople,
  GoBell,
  GoHeart,
  GoPencil,
  GoPerson,
} from "react-icons/go";
import NavButton from "./inputs/NavButton";
import useCreatePostModal from "@/hooks/useCreatePostModal";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface SidebarProps {
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const createPostModal = useCreatePostModal();
  const router = useRouter();
  return (
    <div className="pt-28 fixed hidden md:flex lg:pr-6 sm:pr-1 flex-col gap-3 p-6  border-r-2 h-screen items-center justify-between">
      <div className="flex flex-col gap-3 lg:w-50  sm:w-fit">
        <NavButton
          icon={GoHome}
          label="Home"
          onClick={() => router.push("/")}
        />
        <NavButton
          icon={GoHeart}
          label="Favorites"
          onClick={() => router.push("/likes")}
        />
        <NavButton
          icon={GoPeople}
          label="Friends"
          onClick={() => router.push("/friends")}
        />
        <NavButton
          icon={GoBookmark}
          label="Saved"
          onClick={() => router.push("/saved")}
        />
        <NavButton
          icon={GoPencil}
          label="New Post"
          onClick={() => createPostModal.onOpen()}
        />
        <NavButton
          icon={GoPerson}
          label="Profile"
          onClick={() => router.push(`/${currentUser.id}`)}
        />
      </div>
      <div className="lg:w-50 w-full sm:w-fit">
        <NavButton
          icon={GoSignOut}
          label="Sign Out"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default Sidebar;
