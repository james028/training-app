import React, { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export type TextAreaProps = {
  //id: string;
  name: string;
  //label: string;
  className?: string;
  //rules: any;
};

const TextArea: FC<TextAreaProps> = ({
  //id,
  name,
  //label,
  className = "",
  //rules,
  ...props
}) => {
  const { register, setValue } = useFormContext();

  //zmienić
  const { id, label, rules, defaultValue } = props as any;

  useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue, { shouldDirty: true });
    }
  }, [defaultValue, setValue, id]);

  return (
    <div className="relative">
      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
        {label}
      </label>
      <textarea
        id={id}
        aria-label={label}
        className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight 
            focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
        {...(register && register(name, rules))}
        {...props}
      />
    </div>
  );
};

export default TextArea;
