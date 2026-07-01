import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

type RadioInputsProps = {
  id: string;
  name: string;
  label: string;
  radioOptions: any[];
  className?: string;
  rules: any;
  //defaultValue?: boolean | string;
};

const RadioInputs: FC<RadioInputsProps> = ({
  id,
  name,
  label,
  radioOptions,
  rules,
  className = "",
}) => {
  const { register } = useFormContext();

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      {radioOptions.map((option) => {
        const optionId = `${id}-${String(option.value)}`;

        return (
          <div key={optionId} className="flex items-center">
            <input
              id={optionId}
              type="radio"
              value={String(option.value)}
              className={`w-4 h-4 ${className}`}
              {...register(name, {
                ...rules,
                setValueAs: (v) => v === "true",
              })}
            />

            <label htmlFor={optionId} className="ml-2 text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        );
      })}
    </>
  );
};

// const RadioInputs: FC<RadioInputsProps> = ({
//   id,
//   name,
//   label,
//   radioOptions,
//   className = "",
//   rules,
//   //defaultValue,
//   //...props
// }) => {
//   const { register } = useFormContext();
//
//   //zmienić typowanie
//   //const { defaultValue } = props as any;
//
//   // useEffect(() => {
//   //   if (defaultValue !== undefined) {
//   //     setValue(id, defaultValue, { shouldDirty: true });
//   //   }
//   // }, [defaultValue, setValue, id]);
//
//   return (
//     <>
//       <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//         {label}
//       </span>
//       {radioOptions.map(({ label, value }) => {
//         const optionId = `${id}-${value}`;
//
//         return (
//           <div key={optionId} className="flex items-center">
//             <input
//               id={optionId}
//               type="radio"
//               value={String(value)}
//               className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ${className}`}
//               aria-label={label}
//               {...register(name, {
//                 ...rules,
//                 setValueAs: (v) => v === "true",
//               })}
//             />
//
//             <label
//               htmlFor={optionId}
//               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//             >
//               {label}
//             </label>
//           </div>
//         );
//       })}
//     </>
//   );
// };
//
export default RadioInputs;
