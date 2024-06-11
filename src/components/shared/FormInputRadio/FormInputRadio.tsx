import React from "react";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { ErrorMessage } from "@hookform/error-message";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { get } from "../../../utils/utils";
import styled from "styled-components";
import RadioInputs from "./RadioInputs/RadioInputs";

export type FormRadioInputProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  //zmienic
  errors?: any;
  className?: string;
  leftSideLabel?: boolean;
};

const StyledRadioOrCheckboxButtonContainer = styled.div<{
  leftSideLabel?: boolean;
}>`
  display: flex;
  justify-content: ${(props) =>
    props.leftSideLabel ? "flex-end" : "flex-start"};
  flex-direction: ${(props) =>
    props.leftSideLabel ? "row-reverse" : "reverse"};
`;

const FormInputRadio = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  rules,
  errors,
  className,
  leftSideLabel,
  ...props
}: FormRadioInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={className} aria-live="polite">
      {/*<StyledRadioOrCheckboxButtonContainer leftSideLabel={leftSideLabel}>*/}
      <RadioInputs
        id={id}
        name={name}
        label={label}
        rules={rules}
        aria-invalid={hasError}
        className={`${
          hasError
            ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
            : ""
        }`}
        {...props}
      />
      {/*</StyledRadioOrCheckboxButtonContainer>*/}
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

export default FormInputRadio;
