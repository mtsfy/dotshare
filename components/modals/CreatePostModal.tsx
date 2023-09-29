"use client";

import useCreatePostModal from "@/hooks/useCreatePostModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import TextArea from "../inputs/Textarea";
import { CldImage } from "next-cloudinary";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  IMAGE = 0,
  INFO = 1,
  REVIEW = 2,
}

const CreatePostModal = () => {
  const [step, setStep] = useState(STEPS.IMAGE);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createPostModal = useCreatePostModal();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      caption: "",
      imageSrc: "",
    },
  });

  const title = watch("title");
  const caption = watch("caption");
  const imageSrc = watch("imageSrc");

  const actionLabel = useMemo(() => {
    if (step === STEPS.REVIEW) {
      return "Share";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.REVIEW) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/posts", data)
      .then(() => {
        toast.success("Posted!");
        router.refresh();
        reset();
        setStep(STEPS.IMAGE);
        createPostModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue("imageSrc", value)}
      />
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          className=""
          required
        />

        <TextArea
          id="caption"
          label="Write a caption..."
          type="textarea"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.REVIEW) {
    bodyContent = (
      <div>
        {title && caption && imageSrc ? (
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold text-2xl">{title}</h1>
            {imageSrc && (
              <CldImage
                src={imageSrc}
                crop="fill"
                width={540}
                height={540}
                quality="100"
                alt="image"
              />
            )}
            <p className="text-md font-medium">{caption}</p>
          </div>
        ) : (
          <div className="text-center text-xl font-medium text-neutral-500">
            <h1>Nothing to review.</h1>
            <h1>
              Please go back and add an image, title, and caption in order to
              post.
            </h1>
          </div>
        )}
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={createPostModal.isOpen}
      onClose={createPostModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.IMAGE ? undefined : onBack}
      title="New Post"
      body={bodyContent}
    />
  );
};

export default CreatePostModal;
