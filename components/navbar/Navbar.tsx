"use client";
import { GoPerson } from "react-icons/go";
import Container from "../Container";
import Logo from "../Logo";
import NavButton from "../inputs/NavButton";
import MainNav from "./MainNav";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

interface NavbarProps {
  currentUser?: Record<string, any> | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  return (
    <div className="fixed w-full bg-white z-20 shadow-sm">
      <div className="py-4 border-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* <MainNav currentUser={currentUser} /> */}
            {currentUser &&
              (currentUser.image ? (
                <div
                  className="sm:block md:hidden hover:opacity-80 transition cursor-pointer"
                  onClick={() => router.push(`/${currentUser.id}`)}
                >
                  <CldImage
                    crop="fill"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                    src={currentUser.image}
                    alt="Avatar"
                  />
                </div>
              ) : (
                <div className="sm:block md:hidden">
                  <NavButton
                    icon={GoPerson}
                    onClick={() => router.push(`/${currentUser.id}`)}
                  />
                </div>
              ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
