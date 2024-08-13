import React from "react";
import FormInput from "../shared/FormInput/FormInput";

const data = [
  { id: "1", name: "Siłownia", color: "#6a215e" },
  { id: "1", name: "Sauna", color: "#78d258" },
  { id: "1", name: "Airbike", color: "#3a3f56" },
  { id: "1", name: "Cardio-las", color: "#cd8f67" },
];
const TrainingsType = () => {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Dodaj typ treningu:
      </h2>
      <form>
        {/*<FormInput<any>*/}
        {/*  id=""*/}
        {/*  // @ts-ignore*/}
        {/*  type="text"*/}
        {/*  name=""*/}
        {/*  label="Tytuł treningu"*/}
        {/*  className="mb-2"*/}
        {/*  errors={{}}*/}
        {/*  rules={{}}*/}
        {/*  defaultValue={{}}*/}
        {/*/>*/}
        <input
          // id={id}
          // //ref={ref}
          // aria-label={label}
          className={`bg-gray-50 appearance-none border border-gray-300 rounded w-full py-2 px-4 
          text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 `}
        />
        <button
          className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          type="submit"
        >
          Dodaj
        </button>
      </form>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0
              ? data?.map((item: any) => {
                  return (
                    <tr>
                      {["name", "color"].map((it: any) => {
                        return (
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item[it]}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingsType;
