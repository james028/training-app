import React, { FC, forwardRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export type InputSize = "medium" | "large";
export type InputType = "text" | "select" | "number";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  size?: InputSize;
  className?: string;
  rules: any;
};

const Input: FC<InputProps> = (
  { id, name, label, size = "medium", className = "", rules, ...props },
  //ref,
) => {
  const { register, setValue } = useFormContext();

  //zmienić typowanie
  const { defaultValue } = props as any;

  useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue, { shouldDirty: true });
    }
  }, [defaultValue, setValue, id]);

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        //ref={ref}
        aria-label={label}
        className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 
          text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
        {...(register && register(name, rules))}
        {...props}
      />
    </>
  );
};

export default Input;
