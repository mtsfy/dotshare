import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      alt="Avatar"
      src="/placeholder.jpg"
      className="rounded-full hidden md:block"
      height={30}
      width={30}
    />
  );
};

export default Avatar;
