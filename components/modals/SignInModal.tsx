"use client";

import { useCallback, useState } from "react";
import Modal from "./Modal";
import useSignInModal from "@/hooks/useSignInModal";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import Button from "../inputs/Button";
import useSignUpModal from "@/hooks/useSignUpModal";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
const SignInModal = () => {
  const signInModal = useSignInModal();
  const signUpModal = useSignUpModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    signInModal.onClose();
    signUpModal.onOpen();
  }, [signInModal, signUpModal]);

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

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back!" subtitle="Sign in to your account." />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        onClick={() => signIn("google")}
        outline
        icon={FcGoogle}
        label="Continue with Google"
      />
      <Button
        onClick={() => signIn("github")}
        outline
        icon={AiFillGithub}
        label="Continue with Github"
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div>
          First time using dotshare? {""}
          <span
            className="text-neutral-800 hover:underline cursor-pointer"
            onClick={toggle}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={signInModal.isOpen}
      onClose={signInModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Sign In"
      title="Sign In"
      footer={footerContent}
      body={bodyContent}
    />
  );
};

export default SignInModal;
