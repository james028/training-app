import React from "react";
import FormInput from "../../../shared/FormInput/FormInput";
import { FormProvider, useForm } from "react-hook-form";

const Register = () => {
  const form = useForm<any>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const { handleSubmit, register, setValue, reset } = form;

  const onSubmit = handleSubmit((data: any) => {
    console.log(data, "data");
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <FormProvider {...form}>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <FormInput<any>
                  id="email"
                  // @ts-ignore
                  type="text"
                  name="email"
                  label="Email"
                  className="mb-2"
                  errors={{}}
                  rules={{}}
                />
                <FormInput<any>
                  id="username"
                  // @ts-ignore
                  type="text"
                  name="username"
                  label="Nazwa użytkownika"
                  className="mb-2"
                  errors={{}}
                  rules={{}}
                />
                <FormInput<any>
                  id="password"
                  // @ts-ignore
                  type="text"
                  name="password"
                  label="Hasło"
                  className="mb-2"
                  errors={{}}
                  rules={{}}
                />
              </div>
              <button
                type="submit"
                className=" bg-blue-500 md:bg-green-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Register;
