import React, { FC, forwardRef } from "react";
import styled from "styled-components";

export type DurationProps = {
  name: string;
  className?: string;
  register: any;
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
  ({ name, className = "", register, rules, ...props }, ref) => {
    // dać do folderu const.ts
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

    return (
      <div className="flex">
        {durationArrayData.map(({ title, fieldName }) => {
          return (
            <StyledDurationContainer key={fieldName} className="relative">
              <StyledDurationLabel className="text-gray-800 block mb-1 text-sm tracking-wide">
                <abbr title="hours">{title}</abbr>
              </StyledDurationLabel>
              <input
                name={`name.${fieldName}`}
                aria-label={fieldName}
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
