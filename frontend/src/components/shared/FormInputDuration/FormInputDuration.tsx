import React from "react";
import Duration from "./Duration/Duration";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { get } from "../../../utils";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  name: string;
  label: string;
  className?: string;
};

const FormInputDuration = <T,>({ name, label, className = "" }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
  const hasError = !!error;

  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium">{label}</label>

      <Duration
        name={name}
        className={`${
          hasError
            ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
            : ""
        }`}
      />
      <ErrorMessage
        errors={errors ?? {}}
        name={name}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};

export default FormInputDuration;
