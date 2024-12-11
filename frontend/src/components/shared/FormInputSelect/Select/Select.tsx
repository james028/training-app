import React, { FC, forwardRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export type SelectProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
  options: any[] | null;
  rules: any;
};

const Select: FC<SelectProps> = forwardRef<HTMLInputElement, SelectProps>(
  ({ id, name, label, className = "", options, rules, ...props }, ref) => {
    const { register, setValue } = useFormContext();

    //zmienić typowanie
    const { defaultValue } = props as any;

    useEffect(() => {
      if (defaultValue) {
        setValue(id, defaultValue, { shouldDirty: true });
      }
    }, [defaultValue, setValue, id]);

    return (
      <>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <div className="relative">
          <select
            className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight 
            focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
            id={id}
            aria-label={label}
            //aria-invalid={!!(errors && errorMessages)}
            {...(register && register(name, rules))}
            {...props}
          >
            <option value="">Choose</option>;
            {options?.length &&
              options?.map(({ value, name }) => {
                return (
                  <option key={value} value={value}>
                    {name}
                  </option>
                );
              })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </>
    );
  },
);

export default Select;
