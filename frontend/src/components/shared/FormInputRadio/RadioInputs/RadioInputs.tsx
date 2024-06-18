import React, { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type RadioInputsProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
  rules: any;
};

const RadioInputs: FC<RadioInputsProps> = ({
  id,
  name,
  label,
  className = "",
  rules,
  ...props
}) => {
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
      <label
        htmlFor="link-radio"
        className="text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      {/*tutaj dać moze w innej miejsce*/}
      {[
        { label: "Tak", value: "differentYes" },
        { label: "Nie", value: "differentNo" },
      ].map(({ label, value }: { label: string; value: string }) => {
        return (
          <div key={value}>
            {/*tutaj zrobić inaczej*/}
            {defaultValue === undefined ? (
              <input
                id="link-radio"
                className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${className}`}
                aria-label={label}
                value={value}
                {...(register && register(name, rules))}
                {...props}
              />
            ) : (
              <input
                id="link-radio"
                className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${className}`}
                aria-label={label}
                value={value}
                checked={value === defaultValue}
                {...props}
              />
            )}
            <label
              htmlFor="horizontal-list-radio-license"
              className="w-full py-3 ms-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {label}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default RadioInputs;
