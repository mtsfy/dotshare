"use client";

import axios from "axios";
import Heading from "@/components/Heading";
import Button from "@/components/inputs/Button";
import Input from "@/components/inputs/Input";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TextArea from "@/components/inputs/Textarea";

interface EditProfileClientProps {
  user: Record<string, any>;
}

const EditProfileClient: React.FC<EditProfileClientProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
      category: user.category,
      image: user.image,
    },
  });

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const im = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .patch("/api/edit/profile", data)
      .then(() => {
        router.refresh();
        toast.success("Profile saved.");
        router.push(`/${user.id}`);
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto pl-8 pr-8 flex flex-col gap-4 pb-20">
      <Heading title="Edit Profile" />
      <div className="flex gap-4 mb-4">
        <div className="absolute w-28 h-28">
          <Image
            fill
            className=" block rounded-full object-cover"
            src={im || user.image || "/placeholder.jpg"}
            alt="Avatar"
          />
        </div>
        <div className="ml-32 mb-8 flex flex-col gap-4 mt-6">
          <div>{user.name}</div>
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="ihmnv4cc"
          >
            <button
              disabled={isLoading}
              className=" font-bold hover:opacity-80 text-blue-500"
            >
              Change profile picture
            </button>
          </CldUploadButton>
        </div>
      </div>
      <Input
        disabled={isLoading}
        id="name"
        label="Name"
        register={register}
        errors={errors}
      />
      <Input
        disabled={isLoading}
        id="username"
        label="Username"
        register={register}
        errors={errors}
      />
      <TextArea
        disabled={isLoading}
        id="bio"
        label="Bio"
        register={register}
        errors={errors}
      />
      <Button
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
        label="Edit Profile"
      />
    </div>
  );
};

export default EditProfileClient;
