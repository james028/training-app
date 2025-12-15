import React from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import Select from "./Select/Select";
import { ErrorMessage } from "@hookform/error-message";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { get } from "../../../utils";

export type FormInputSelectProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className: string;
  //tu zmienić
  options: any[] | null;
};

const FormInputSelect = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  rules,
  errors,
  className,
  options,
  ...props
}: FormInputSelectProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={className} aria-live="polite">
      <Select
        id={id}
        label={label}
        name={name}
        className={`${
          hasError
            ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
            : ""
        }`}
        rules={rules}
        options={options}
        {...props}
      />
      <ErrorMessage
        errors={errors ?? {}}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};

export default FormInputSelect;
