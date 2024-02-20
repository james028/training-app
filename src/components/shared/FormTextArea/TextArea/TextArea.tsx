import React, { FC, forwardRef, useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { RegistrationFormFields } from "../../../Forms/AddTrainingForm/AddTrainingForm";

export type TextAreaProps = {
  name: string;
  label: string;
  className?: string;
  //setValue: any;
  //register: any;
  rules: any;
};

const TextArea: FC<TextAreaProps> = ({
  name,
  label,
  className = "",
  //setValue,
  //register,
  rules,
  ...props
}) => {
  console.log(props, "props");
  const {
    register,
    setValue,
    //formState: { errors }
  } = useFormContext();

  // @ts-ignore
  const { defaultValue, id } = props;

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
      <div className="relative">
        <textarea
          className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight 
            focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
          //name={name}
          aria-label={label}
          defaultValue={defaultValue}
          {...register(name, rules)}
          {...props}
        />
      </div>
    </>
  );
};

export default TextArea;
