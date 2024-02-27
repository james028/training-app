import React, { FC, forwardRef, useEffect } from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

export type DurationProps = {
  id: string;
  name: string;
  className?: string;
  rules: any;
};

const StyledDurationContainer = styled.div`
  flex: 0 0 33%;
`;

const StyledDurationLabel = styled.label`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Duration: FC<DurationProps> = forwardRef<HTMLInputElement, DurationProps>(
  ({ id, name, className = "", rules, ...props }, ref) => {
    // dać do folderu const.ts
    const { register, setValue } = useFormContext();

    const durationArrayData = [
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

    //zrobić tak aby w tym inoucie bylo max 2 znaki

    const durationArray = defaultValue?.split(":");
    const durationData = durationArrayData?.map(
      (duration: Record<string, string>, index) => {
        return {
          ...duration,
          value: Number(durationArray?.[index] ?? 0),
        };
      },
    );

    useEffect(() => {
      if (durationData) {
        durationData.map((data: any, index) => {
          const { fieldName, value } = data;
          setValue(`${id}.${fieldName}`, `${value}`, { shouldDirty: true });
        });
      }
    }, [setValue, id]);

    return (
      <div className="flex">
        {durationData.map(({ title, fieldName }: any, index) => {
          return (
            <StyledDurationContainer key={fieldName} className="relative">
              <StyledDurationLabel className="text-gray-800 block mb-1 text-sm tracking-wide">
                <abbr title="hours">{title}</abbr>
              </StyledDurationLabel>
              <input
                id={id}
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
