"use client";

import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface NavButtonProps {
  label?: string;
  icon?: IconType;
  outline?: boolean;
  className?: string;
  onClick?: () => void;
  size?: number;
}

const NavButton: React.FC<NavButtonProps> = ({
  label,
  icon: Icon,
  className,
  onClick,
  size = 25,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={twMerge(
          `
        
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:bg-neutral-200
        transition
        w-full
        bg-white
        font-semibold
        p-3
        text-md
        group
        flex items-center gap-3

  `,
          className
        )}
      >
        {Icon && <Icon size={size} className="group-hover:scale-110" />}
        <span className="hidden lg:block text-lg font-semibold">{label}</span>
      </button>
    </>
  );
};

export default NavButton;
