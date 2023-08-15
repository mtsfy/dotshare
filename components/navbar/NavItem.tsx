"use client";

import { IconType } from "react-icons";

interface NavItemProps {
  onClick: () => void;
  label: string;
  icon?: IconType | undefined;
}

const NavItem: React.FC<NavItemProps> = ({ onClick, label, icon: Icon }) => {
  return (
    <div
      className="
    px-4
    py-3
    hover:bg-neutral-100
    rounded-xl
    transition
    text-lg
    w-full
    
    
    flex items-center gap-3"
      onClick={onClick}
    >
      {Icon && <Icon />}
      {label}
    </div>
  );
};

export default NavItem;
