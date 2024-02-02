import React from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Select from "./Select/Select";

export type FormInputSelectProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className: string;
  label: string;
  id: any;
  options: any[];
};
const FormInputSelect = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  options,
  ...props
}: FormInputSelectProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  //const errorMessages = get(errors, name);
  //const hasError = !!(errors && errorMessages);
  return (
    <div className={className} aria-live="polite">
      <Select
        placeholder={""}
        name={name}
        //aria-invalid={hasError}
        // className={classNames({
        //   "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
        //     hasError,
        // })}
        options={options}
        {...props}
        register={register}
        rules={rules}
      />
      {/*{errors && <small className="error">{error.message}</small>}*/}
      {/*{errors && <div className="error">This field is required</div>}*/}
      {/*<ErrorMessage*/}
      {/*  errors={errors}*/}
      {/*  // eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
      {/*  name={name as any}*/}
      {/*  render={({ message }) => (*/}
      {/*    <FormErrorMessage className="mt-1">{message}</FormErrorMessage>*/}
      {/*  )}*/}
      {/*/>*/}
    </div>
  );
};

// {...(register && register(name, rules))}

export default FormInputSelect;