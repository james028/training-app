import React, { FC, forwardRef } from "react";
import { SelectProps } from "../../FormInputSelect/Select/Select";

const Duration: FC<SelectProps> = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      type = "select",
      className = "",
      placeholder,
      options,
      register,
      rules,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
          <abbr title="hours">hr</abbr>
        </label>
        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          aria-label={label}
          placeholder={placeholder}
          className="bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          {...props}
        />
      </>
    );
  },
);

export default Duration;
