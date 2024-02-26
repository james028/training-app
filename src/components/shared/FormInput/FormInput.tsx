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
import { get } from "../../../utils/utils";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

export type FormInputProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className?: string;
};

const FormInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  console.log(hasError, "has");

  return (
    <div className={className} aria-live="polite">
      <Input
        label={label}
        name={name}
        rules={rules}
        aria-invalid={hasError}
        className={`${
          hasError
            ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
            : ""
        }`}
        {...props}
      />
      <ErrorMessage
        errors={errors ?? {}}
        // zmienic to any
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};

export default FormInput;
