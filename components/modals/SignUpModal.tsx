"use client";

import useSignUpModal from "@/hooks/useSignUpModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../inputs/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useSignInModal from "@/hooks/useSignInModal";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
const SignUpModal = () => {
  const signUpModal = useSignUpModal();
  const signInModal = useSignInModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

  const toggle = useCallback(() => {
    signUpModal.onClose();
    signInModal.onOpen();
  }, [signInModal, signUpModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/signup", data)
      .then(() => {
        toast.success("Signed up successfully!");
        signUpModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-2 md:gap-4">
      <Heading
        title="Welcome to dotshare!"
        subtitle="Sign up to see what your friends are sharing."
      />
      <Input
        id="name"
        label="Name"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="email"
        label="Email"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        register={register}
        errors={errors}
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4">
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
      <div className="text-neutral-500 text-center mt-2 font-light">
        <div>
          Already have an account?{" "}
          <span
            className="text-neutral-800 hover:underline cursor-pointer"
            onClick={toggle}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={signUpModal.isOpen}
      onClose={signUpModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Sign Up"
      title="Sign Up"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignUpModal;
