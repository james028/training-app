import React from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import Select, { SelectOption } from "./Select/Select";
import { ErrorMessage } from "@hookform/error-message";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { get } from "../../../utils";

export type FormInputSelectProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  errors?: any;
  className?: string;
  options: SelectOption[] | null;
};

const FormInputSelect = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  rules,
  errors,
  className,
  options,
}: FormInputSelectProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!errorMessages;

  return (
    <div className={className} aria-live="polite">
      <Select
        id={id}
        name={name}
        label={label}
        options={options}
        rules={rules}
        className={
          hasError
            ? "border-red-600 focus:border-red-600 focus:ring-red-600"
            : ""
        }
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
