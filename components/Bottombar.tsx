"use client";

import { GoBookmark, GoHeart, GoHome, GoPeople, GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";
import useCreatePostModal from "@/hooks/useCreatePostModal";
import NavButton from "./inputs/NavButton";
import { User } from "@prisma/client";

interface BottombarProps {
  currentUser: User;
}

const Bottombar: React.FC<BottombarProps> = ({ currentUser }) => {
  const router = useRouter();
  const createPost = useCreatePostModal();
  return (
    <div
      className="
    sm:block 
    md:hidden 
    bg-white
    fixed
    w-full
    min-w-7xl
    text-center
    
   
    -translate-x-1/2
    border-t-[1px] 
    left-1/2
    bottom-0
    border-gray-200
    pl-4
p-2   
    
    h-18 "
    >
      <div className="flex justify-around max-w-lg mx-auto items-center gap-4 pr-4 lg:w-50  sm:w-fit">
        <div>
          <NavButton icon={GoHome} size={27} onClick={() => router.push("/")} />
        </div>
        <div>
          <NavButton
            icon={GoPeople}
            size={27}
            onClick={() => router.push("/friends")}
          />
        </div>
        <div>
          <NavButton
            icon={GoPlus}
            size={27}
            onClick={() => createPost.onOpen()}
          />
        </div>
        <div>
          <NavButton
            icon={GoHeart}
            size={27}
            onClick={() => router.push("/likes")}
          />
        </div>

        <div>
          <NavButton
            icon={GoBookmark}
            size={27}
            onClick={() => router.push("/saved")}
          />
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
