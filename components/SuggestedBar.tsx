"use client";

import Avatar from "./Avatar";
import { User } from "@prisma/client";

interface SuggestedBarProps {
  currentUser: User;
}

const SuggestedBar: React.FC<SuggestedBarProps> = ({ currentUser }) => {
  return (
    <div className="hidden 2xl:block 2xl:w-1/6 mr-20 ">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 p-2 font-medium">
          <Avatar />
          <div className="font-bold">{currentUser.name}</div>
        </div>
        <div className="mt-3">
          <h1 className="font-bold text-neutral-600">Suggested for you : </h1>
        </div>
      </div>
    </div>
  );
};

export default SuggestedBar;
