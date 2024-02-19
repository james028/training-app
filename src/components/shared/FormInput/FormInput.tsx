import React from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { Input } from "./Input/Input";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className: string;
  label: string;
  id: any;
};
// & Omit<InputProps, "name">;
const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  //const errorMessages = get(errors, name);
  //const hasError = !!(errors && errorMessages);

  return (
    <div className={className} aria-live="polite">
      <Input
        placeholder={""}
        name={name}
        //aria-invalid={hasError}
        // className={classNames({
        //   "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
        //     hasError,
        // })}
        {...(register && register(name, rules))}
        {...props}
      />
      {/*{errors && <small className="error">{error.message}</small>}*/}
      {/*{errors && <div className="error">This field is required</div>}*/}
      {/*<ErrorMessage*/}
      {/*  errors={errors}*/}
      {/*  // eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
      {/*  name={name as any}*/}
      {/*  render={({ message }) => (*/}
      {/*    <FormErrorMessage.tsx className="mt-1">{message}</FormErrorMessage.tsx>*/}
      {/*  )}*/}
      {/*/>*/}
    </div>
  );
};

export default FormInput;
