import React, { FC, forwardRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export type InputSize = "medium" | "large";
export type InputType = "text" | "select" | "number";

export type InputProps = {
  //id: string;
  name: string;
  label: string;
  //type?: InputType;
  size?: InputSize;
  className?: string;
  //register: any;
  rules: any;
  //defaultValue: any;
  //placeholder: string;
};

export const Input: FC<InputProps> = (
  {
    //id,
    name,
    label,
    //type,
    size = "medium",
    className = "",
    //placeholder,
    //register,
    rules,
    //defaultValue,
    ...props
  },
  //ref,
) => {
  console.log(props, " w input");

  const { register, setValue } = useFormContext();

  //zmienić typowanie
  const { defaultValue, id } = props as any;

  useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue, { shouldDirty: true });
    }
  }, [defaultValue, setValue, id]);

  return (
    <>
      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
        {label}
      </label>
      <input
        id={id}
        //ref={ref}
        //name={name}
        //type={type}
        aria-label={label}
        //placeholder={placeholder}
        className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 
          text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
        value={defaultValue}
        {...register(name, rules)}
        {...props}
      />
    </>
  );
};
