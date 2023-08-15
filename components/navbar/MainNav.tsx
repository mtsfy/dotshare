"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiFillHeart,
  AiOutlineLogin,
} from "react-icons/ai/index";

import { BsFillPersonPlusFill } from "react-icons/bs/index";

import { IoMdAlbums } from "react-icons/io/index";
import useSignUpModal from "@/hooks/useSignUpModal";
import useSignInModal from "@/hooks/useSignInModal";
import { User } from "@prisma/client";
import NavItem from "./NavItem";
import { signOut } from "next-auth/react";

interface MainNavProps {
  currentUser?: User | null;
}

const MainNav: React.FC<MainNavProps> = ({ currentUser }) => {
  const signUpModal = useSignUpModal();
  const signInModal = useSignInModal();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className="flex items-center p-4 md:py-4 md:px-4 border-[1px] border-neutral-200 gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <AiOutlineMenu />
      </div>
      {isOpen && (
        <div
          className="
        absolute 
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-[20vw]
        xl:w-[15vw]
        border-neutral-200
        border-[1px]
        p-2
        bg-white
        overflow-hidden
        right-0
        top-12
        mt-2
        md:mt-2
        "
        >
          <div
            className="
            flex 
            flex-col 
            cursor-pointer
          "
          >
            {currentUser ? (
              <>
                <NavItem
                  label="Home"
                  onClick={() => router.push("/")}
                  icon={AiFillHome}
                />
                <NavItem
                  label="My Posts"
                  onClick={() => router.push("/posts")}
                  icon={IoMdAlbums}
                />
                <NavItem
                  label="My Likes"
                  onClick={() => router.push("/likes")}
                  icon={AiFillHeart}
                />
                <hr className="m-3" />
                <NavItem label="Sign Out" onClick={signOut} />
              </>
            ) : (
              <>
                <NavItem
                  onClick={signInModal.onOpen}
                  label="Sign In"
                  icon={AiOutlineLogin}
                />
                <NavItem
                  onClick={signUpModal.onOpen}
                  label="Sign Up"
                  icon={BsFillPersonPlusFill}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNav;
