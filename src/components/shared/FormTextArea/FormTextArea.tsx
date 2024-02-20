import React from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  set,
  UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { get } from "../../../utils/utils";
import TextArea from "./TextArea/TextArea";

export type FormTextAreaProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className: string;
  label: string;
  id: string;
  //rows?: number;
  //cols?: number;
  defaultValue: any;
  //setValue: any;
};

const FormTextArea = <TFormValues extends Record<string, unknown>>({
  name,
  //setValue,
  //register,
  rules,
  errors,
  className,
  ...props
}: FormTextAreaProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  console.log(hasError);

  //has error obsluzyc gdy sie usunie defaultValue

  return (
    <div className={className} aria-live="polite">
      <TextArea
        name={name}
        className={`${
          hasError
            ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
            : ""
        }`}
        //setValue={setValue}
        //register={register}
        rules={rules}
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

export default FormTextArea;
