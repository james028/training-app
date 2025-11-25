import React, { FC, forwardRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { StyledDurationContainer, StyledDurationLabel } from "./style";

type DurationProps = {
  id: string;
  name: string;
  className?: string;
  rules: any;
};
//
// type DurationDataProps = {
//   title: string;
//   fieldName: string;
//   value: string;
// };

type DurationArrayData = {
  title: string;
  fieldName: string;
  value: number;
};
const Duration: FC<DurationProps> = forwardRef<HTMLInputElement, DurationProps>(
  ({ id, name, className = "", rules, ...props }, ref) => {
    // dać do folderu const.ts ///nieee
    const { register, setValue } = useFormContext();

    const durationArrayData: Pick<DurationArrayData, "title" | "fieldName">[] =
      [
        {
          title: "hr",
          fieldName: "hour",
        },
        {
          title: "min",
          fieldName: "minutes",
        },
        {
          title: "s",
          fieldName: "seconds",
        },
      ];

    //zmienić typowanie
    const { defaultValue } = props as any;

    //zrobić tak aby w tym inoucie bylo max 2 znaki !!!

    console.log(defaultValue, "def");
    const durationArray = defaultValue?.split(":");
    console.log(durationArray, "arr");
    ///const durationData: DurationArrayData[] = durationArrayData?.map(
    const durationData = durationArrayData?.map(
      (duration: Record<string, string>, index: string | number) => {
        return {
          ...duration,
          value: Number(durationArray?.[index] ?? 0),
        };
      },
    );

    console.log(durationData);

    useEffect(() => {
      //if (durationData) {
      durationData.forEach((data: any) => {
        const { fieldName, value } = data;
        setValue(`${id}.${fieldName}`, `${value}`, { shouldDirty: true });
      });
      //}
    }, [setValue, id, defaultValue]);

    return (
      <div className="flex">
        {durationData.map(({ title, fieldName, value }: any) => {
          return (
            <StyledDurationContainer key={fieldName} className="relative">
              <StyledDurationLabel className="text-gray-800 block mb-1 text-sm tracking-wide">
                <abbr title="hours">{title}</abbr>
              </StyledDurationLabel>
              <input
                id={`id-${title}`}
                aria-label={fieldName}
                type="number"
                className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full 
                py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
                {...(register && register(`${name}.${fieldName}`, rules))}
                {...props}
              />
            </StyledDurationContainer>
          );
        })}
      </div>
    );
  },
);

export default Duration;
