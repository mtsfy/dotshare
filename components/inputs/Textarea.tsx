import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextAreaProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  type = "text",
  disabled = false,
  required = false,
  register,
  errors,
  className,
}) => {
  return (
    <div className=" relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        className={twMerge(
          `
        peer
        w-full
        p-8
       
        resize-none
        
        h-40

        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        pl-4
        ${errors[id] ? "border-red-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-red-500" : "focus:border-black"}
        
        `,
          className
        )}
      />
      <label
        className={`
      absolute
      text-lg
      duration-150
      transform
      -translate-y-3
      top-5
      z-10
      origin-[0]
      left-4
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      peer-focus:text-md
      ${errors[id] ? "text-red-500" : "text-zinc-400"}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
