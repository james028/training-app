import React from "react";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

import { useFormContext } from "react-hook-form";
import { RadioOption } from "../../../constants";
import RadioInputs from "./RadioInputs/RadioInputs";

interface FormInputRadioProps {
  name: string;
  label: string;
  radioOptions: RadioOption[];
  className?: string;
  leftSideLabel?: boolean;
}

const FormInputRadio = ({ name, label, radioOptions }: FormInputRadioProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div
            // className={`flex flex-col gap-2 ${
            //   leftSideLabel
            //     ? "sm:flex-row sm:items-center sm:justify-between"
            //     : ""
            // } ${className}`}
            className="mb-2 w-2/5"
          >
            <RadioInputs
              name={name}
              label={label}
              radioOptions={radioOptions}
              field={field}
              error={error}
            />
            <ErrorMessage
              errors={errors}
              name={name}
              render={(error) => (
                <FormErrorMessage className="mt-1">
                  {error.message}
                </FormErrorMessage>
              )}
            />
          </div>
        );
      }}
    />
  );
};

// const FormInputRadio = <TFormValues extends Record<string, unknown>>({
//   id,
//   label,
//   name,
//   radioOptions,
//   rules,
//   errors,
//   className,
//   leftSideLabel,
//   //defaultValue,
//   //...props
// }: FormRadioInputProps<TFormValues>): JSX.Element => {
//   // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
//   const errorMessages = get(errors, name);
//   //const hasError = !!(errors && errorMessages);
//   const hasError = !!errorMessages;
//
//   return (
//     <div className={className} aria-live="polite">
//       <StyledRadioOrCheckboxButtonContainer leftSideLabel={leftSideLabel}>
//         <RadioInputs
//           id={id}
//           name={name}
//           label={label}
//           radioOptions={radioOptions}
//           rules={rules}
//           aria-invalid={hasError}
//           className={`${
//             hasError
//               ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600"
//               : ""
//           }`}
//         />
//       </StyledRadioOrCheckboxButtonContainer>
//       <ErrorMessage
//         errors={errors ?? {}}
//         name={name}
//         render={({ message }) => (
//           <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
//         )}
//       />
//     </div>
//   );
// };
//
export default FormInputRadio;
