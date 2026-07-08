import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { RadioOption } from "../../../../constants";

type RadioInputsProps<TFormValues extends FieldValues> = {
  name: string;
  label: string;
  radioOptions: RadioOption[];
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  error: FieldError | undefined;
  className?: string;
};

export const RadioInputs = <TFormValues extends FieldValues>({
  name,
  label,
  radioOptions,
  field,
  error,
}: RadioInputsProps<TFormValues>): JSX.Element => {
  // RHF trzyma boolean | undefined w polu — do inputa musimy mieć string
  const stringValue =
    field.value === undefined || field.value === null
      ? ""
      : String(field.value);

  return (
    <>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex gap-4">
        {radioOptions.map((option) => {
          const optionValue = String(option.value);
          const inputId = `${name}-${optionValue}`;

          return (
            <label
              key={optionValue}
              htmlFor={inputId}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                id={inputId}
                type="radio"
                name={field.name}
                value={optionValue}
                checked={stringValue === optionValue}
                onChange={() => field.onChange(option.value)} // zapisujemy realny boolean
                onBlur={field.onBlur}
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
};

export default RadioInputs;
