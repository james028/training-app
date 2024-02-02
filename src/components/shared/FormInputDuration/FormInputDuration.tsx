import React from "react";
import { FormInputSelectProps } from "../FormInputSelect/FormInputSelect";
import Duration from "./Duration/Duration";

const FormInputDuration = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  options,
  ...props
}: FormInputSelectProps<TFormValues>): JSX.Element => {
  return (
    <div className={className} aria-live="polite">
      <Duration
        placeholder={""}
        name={name}
        //aria-invalid={hasError}
        // className={classNames({
        //   "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
        //     hasError,
        // })}
        options={options}
        {...props}
        register={register}
        rules={rules}
      />
    </div>
  );
};

export default FormInputDuration;
