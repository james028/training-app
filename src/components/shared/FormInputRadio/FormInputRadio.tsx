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

export type FormRadioInputProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className?: string;
  leftSideLabel?: boolean;
};

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

  //nizej
  const { register, setValue } = useFormContext();

  //zmienić typowanie
  const { defaultValue } = props as any;

  React.useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue, { shouldDirty: true });
    }
  }, [defaultValue, setValue, id]);

  console.log(id, "idx");

  return (
    <div className={className} aria-live="polite">
      <input
        id="link-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        aria-label={label}
        {...(register && register(name, rules))}
        {...props}
      />
      <label
        htmlFor="link-radio"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
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
