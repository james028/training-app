import React, { FC, forwardRef, useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { RegistrationFormFields } from "../../../Forms/AddTrainingForm/AddTrainingForm";

export type TextAreaProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
  rules: any;
  value: any;
};

const TextArea: FC<TextAreaProps> = ({
  id,
  name,
  label,
  className = "",
  rules,
  value,
  ...props
}) => {
  const {
    register,
    setValue,
    //formState: { errors }
  } = useFormContext();

  //zmienić
  //const { defaultValue } = props as any;

  useEffect(() => {
    if (value) {
      setValue(id, value, { shouldDirty: true });
    }
  }, [value, setValue, id]);

  return (
    <>
      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight 
            focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
          aria-label={label}
          //defaultValue={defaultValue}
          {...register(name, rules)}
          {...props}
        />
      </div>
    </>
  );
};

export default TextArea;
