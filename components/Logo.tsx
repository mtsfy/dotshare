"use client";
import { useRouter } from "next/navigation";
import { RiShareLine } from "react-icons/ri";
const Logo = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <RiShareLine size={25} />
      <h1 className="text-2xl font-bold">dotshare</h1>
    </div>
  );
};

export default Logo;
