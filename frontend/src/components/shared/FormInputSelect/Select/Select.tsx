import { FC } from "react";
import { useFormContext } from "react-hook-form";

export type SelectOption = {
  value: string | number;
  name: string;
};

export type SelectProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
  options: SelectOption[] | null;
  rules?: any;
};

const Select: FC<SelectProps> = ({
  id,
  name,
  label,
  className = "",
  options,
  rules,
}) => {
  const { register } = useFormContext();

  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          aria-label={label}
          className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight 
          focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
          {...register(name, rules)}
        >
          <option value="">Choose</option>

          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          ))}
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
};

export default Select;
