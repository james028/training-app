import React, { FC, forwardRef } from "react";
import { InputType } from "../../FormInput/Input/Input";

export type DurationProps = {
  id: string;
  name: string;
  type: InputType;
  className?: string;
  register: any;
  rules: any;
};

const Duration: FC<DurationProps> = forwardRef<HTMLInputElement, DurationProps>(
  ({ id, name, type, className = "", register, rules, ...props }, ref) => {
    //please enter no more than 2 characters

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
            //ostylować
            <div className="relative" style={{ flex: "0 0 33%" }}>
              <label
                className="text-gray-800 block mb-1 text-sm tracking-wide"
                style={{ position: "absolute", top: "10px", right: "20px" }}
              >
                <abbr title="hours">{title}</abbr>
              </label>
              <input
                id={id}
                name={`${name}.hour`}
                {...(register && register(`${name}.${fieldName}`, rules))}
                type={type}
                //placeholder={placeholder}
                className="bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                {...props}
              />
            </div>
          );
        })}
        {/*<div className="relative" style={{ flex: "0 0 33%" }}>*/}
        {/*  <label*/}
        {/*    className="text-gray-800 block mb-1 text-sm tracking-wide"*/}
        {/*    style={{ position: "absolute", top: "10px", right: "20px" }}*/}
        {/*  >*/}
        {/*    <abbr title="hours">min</abbr>*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    id={id}*/}
        {/*    name={`${name}.minutes`}*/}
        {/*    {...(register && register(`${name}.minutes`, rules))}*/}
        {/*    type={type}*/}
        {/*    //placeholder={placeholder}*/}
        {/*    className="bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"*/}
        {/*    {...props}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="relative" style={{ flex: "0 0 33%" }}>*/}
        {/*  <label*/}
        {/*    className="text-gray-800 block mb-1 text-sm tracking-wide"*/}
        {/*    style={{ position: "absolute", top: "10px", right: "20px" }}*/}
        {/*  >*/}
        {/*    <abbr title="hours">s</abbr>*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    id={id}*/}
        {/*    name={`${name}.seconds`}*/}
        {/*    {...(register && register(`${name}.seconds`, rules))}*/}
        {/*    type={type}*/}
        {/*    //placeholder={placeholder}*/}
        {/*    className="bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"*/}
        {/*    {...props}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    );
  },
);

export default Duration;
