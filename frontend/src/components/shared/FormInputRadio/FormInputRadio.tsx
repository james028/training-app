import React from "react";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { ErrorMessage } from "@hookform/error-message";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import RadioInputs from "./RadioInputs/RadioInputs";
import { get } from "../../../utils";
import { StyledRadioOrCheckboxButtonContainer } from "./style";

export type FormRadioInputProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  radioOptions: { label: string; value: boolean }[];
  rules?: RegisterOptions;
  errors?: any;
  className?: string;
  leftSideLabel?: boolean;
  //defaultValue?: string | boolean;
};

const FormInputRadio = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  radioOptions,
  rules,
  errors,
  className,
  leftSideLabel,
  //defaultValue,
  //...props
}: FormRadioInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  //const hasError = !!(errors && errorMessages);
  const hasError = !!errorMessages;

  return (
    <div className={className} aria-live="polite">
      <StyledRadioOrCheckboxButtonContainer leftSideLabel={leftSideLabel}>
        <RadioInputs
          id={id}
          name={name}
          label={label}
          radioOptions={radioOptions}
          rules={rules}
          aria-invalid={hasError}
          className={`${
            hasError
              ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
              : ""
          }`}
        />
      </StyledRadioOrCheckboxButtonContainer>
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

export default FormInputRadio;
