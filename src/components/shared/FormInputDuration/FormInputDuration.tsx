import React from "react";
import { Controller } from "react-hook-form";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type ddprops<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className: string;
  label: string;
  id: any;
  options: any[];
  control: any;
};
const FormInputDuration = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  options,
  control,
  ...props
}: ddprops<TFormValues>): JSX.Element => {
  console.log(props, "props");
  // @ts-ignore

  return (
    <div className={className} aria-live="polite">
      {/*<Duration*/}
      {/*    placeholder={""}*/}
      {/*    name={name}*/}
      {/*    //aria-invalid={hasError}*/}
      {/*    // className={classNames({*/}
      {/*    //   "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":*/}
      {/*    //     hasError,*/}
      {/*    // })}*/}
      {/*    options={options}*/}
      {/*    {...props}*/}
      {/*    register={register}*/}
      {/*    rules={rules}*/}
      {/*/>*/}
      {/*<Controller*/}
      {/*  name="duration.hour"*/}
      {/*  control={control}*/}
      {/*  render={({ field: { onChange, onBlur, value, ref } }) => (*/}
      {/*    <input*/}
      {/*      onBlur={onBlur}*/}
      {/*      onChange={onChange}*/}
      {/*      value={value}*/}
      {/*      type="number"*/}
      {/*      //variant="filled"*/}
      {/*      placeholder="username"*/}
      {/*      ref={ref}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      {/*<Controller*/}
      {/*  name="duration.minutes"*/}
      {/*  control={control}*/}
      {/*  render={({ field: { onChange, onBlur, value, ref } }) => (*/}
      {/*    <>*/}
      {/*      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">*/}
      {/*        <abbr title="hours">hr</abbr>*/}
      {/*      </label>*/}
      {/*      <input*/}
      {/*        //onBlur={onBlur}*/}
      {/*        onChange={onChange}*/}
      {/*        value={value}*/}
      {/*        type="text"*/}
      {/*        //variant="filled"*/}
      {/*        //placeholder="username"*/}
      {/*        ref={ref}*/}
      {/*      />*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*/>*/}
      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
        <abbr title="hours">hr</abbr>
      </label>
      <input
        // @ts-ignore
        //id={props.id}
        //ref={ref}
        name={`${name}.hour`}
        // @ts-ignore
        {...(register && register(`${name}.hour`, rules))}
        //type={type}
        //aria-label={label}
        //placeholder={placeholder}
        className="bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        {...props}
      />
      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
        <abbr title="hours">min</abbr>
      </label>
      <input
        // @ts-ignore

        //id={id}
        //ref={ref}
        name={`${name}.minutes`}
        // @ts-ignore
        {...(register && register(`${name}.minutes`, rules))}
        //type={type}
        //aria-label={label}
        //placeholder={placeholder}
        className="bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        {...props}
      />
    </div>
  );
};

export default FormInputDuration;
