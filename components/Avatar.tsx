import Image from "next/image";

interface AvatarProps {
  size?: number;
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 30,
  src = "/placeholder.jpg",
}) => {
  return (
    <Image
      alt="Avatar"
      src={src}
      className="rounded-full"
      height={size}
      width={size}
    />
  );
};

export default Avatar;
