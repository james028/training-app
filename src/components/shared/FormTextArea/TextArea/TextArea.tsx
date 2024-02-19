import React, { FC, forwardRef } from "react";

export type TextAreaProps = {
  name: string;
  label: string;
  className?: string;
  register: any;
  rules: any;
};

const TextArea: FC<TextAreaProps> = forwardRef<HTMLInputElement, TextAreaProps>(
  ({ name, label, className = "", register, rules, ...props }, ref) => {
    console.log(props, "props");

    return (
      <>
        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
          {label}
        </label>
        <div className="relative">
          <textarea
            className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight 
            focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
            name={name}
            aria-label={label}
            {...(register && register(name, rules))}
            {...props}
          />
        </div>
      </>
    );
  },
);

export default TextArea;
