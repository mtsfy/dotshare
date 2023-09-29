"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "./inputs/Button";
import Input from "./inputs/Input";
import Logo from "./Logo";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSignUpModal from "@/hooks/useSignUpModal";
import useSignInModal from "@/hooks/useSignInModal";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

interface AuthClientProps {
  option?: number;
}

const AuthClient: React.FC<AuthClientProps> = ({ option }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const signUpModal = useSignUpModal();

  const signInModal = useSignInModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Signed in successfully.");
        router.refresh();
        signInModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  return (
    <div className="flex justify-center items-center p-6 mt-4 flex-1 h-[80vh]">
      <div className="flex flex-col gap-6 items-center p-12">
        <Logo />
        {/* <div>Sign up to see what your friends are sharing.</div> */}

        <div className="flex flex-col gap-3">
          <Input
            type="text"
            register={register}
            disabled={isLoading}
            errors={errors}
            id="email"
            label="Email"
            required
            className="w-80"
          />
          <Input
            type="password"
            register={register}
            disabled={isLoading}
            errors={errors}
            id="password"
            label="Password"
            required
            className="w-80"
          />
          <Button label="Sign In" onClick={handleSubmit(onSubmit)} />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-neutral-600/70 h-1 w-36 rounded-lg" />
          <div>or</div>
          <div className="bg-neutral-600/70 h-1 w-36 rounded-lg" />
        </div>
        <Button
          label="Sign In with Google"
          icon={FcGoogle}
          outline
          onClick={() => signIn("google")}
        />
        <Button
          label="Sign In with Github"
          icon={AiFillGithub}
          outline
          onClick={() => signIn("github")}
        />
        <div className="text-neutral-500 text-center mt-2 font-light">
          <div>
            Don&apos;t have an account?{" "}
            <span
              className="text-neutral-800 hover:underline cursor-pointer"
              onClick={signUpModal.onOpen}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthClient;
