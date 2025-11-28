import React from "react";
import FormInput from "../../../shared/FormInput/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver/useYupValidationResolver";
import { registerSchema } from "../schemas";
import usePostApi, { Status } from "../../../../hooks/api/post/useApiPost";
import { URL } from "../../../../constants";

type RegisterFormFields = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormFields>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: useYupValidationResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const linkRegister = "api/auth/register";
  // const { mutation, responseStatus } = usePostApi(
  //   `${URL}${linkRegister}`,
  //   ["userRegister"],
  //   null,
  // );
  const { responseStatus } = usePostApi({
    link: `${URL}${linkRegister}`,
    queryKey: ["userRegister"],
  });

  const onSubmit = handleSubmit((data: any) => {
    try {
      const { confirmPassword, ...restObjectData } = data;
      //mutation.mutate({ paramsObj: null, bodyData: restObjectData });

      setTimeout(async () => {
        reset();
      }, 500);
    } catch (error) {
      console.log(error);
      //pozniej tutaj toast ze nie udalo sie zarejestrować
    }
  });

  const isAfterRegisteredPanel = responseStatus === Status.SUCCESS;

  //zrobić przycisk disabled na button jesli walidacja nie przeszla i pola nie sa wypelnione

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {!isAfterRegisteredPanel ? (
            <>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Zarejestruj się
              </h1>
              <FormProvider {...form}>
                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                  <div>
                    <FormInput<any>
                      id="email"
                      // @ts-ignore
                      type="text"
                      name="email"
                      label="Email"
                      className="mb-2"
                      errors={errors}
                      rules={{}}
                    />
                    <FormInput<any>
                      id="username"
                      // @ts-ignore
                      type="text"
                      name="username"
                      label="Nazwa użytkownika"
                      className="mb-2"
                      errors={errors}
                      rules={{}}
                    />
                    <FormInput<any>
                      id="password"
                      // @ts-ignore
                      type="text"
                      name="password"
                      label="Hasło"
                      className="mb-2"
                      errors={errors}
                      rules={{}}
                    />
                    <FormInput<any>
                      id="confirmPassword"
                      // @ts-ignore
                      type="text"
                      name="confirmPassword"
                      label="Potwierdź hasło"
                      className="mb-2"
                      errors={errors}
                      rules={{}}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" bg-blue-500 md:bg-green-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Zarejestruj się
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Masz już konto?{" "}
                    <a
                      onClick={() => navigate("/login")}
                      href=""
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Zaloguj się
                    </a>
                  </p>
                </form>
              </FormProvider>
            </>
          ) : (
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">
                Zarejestrowałeś się!
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Zarejestrowałeś nowe konto, teraz możesz się zalogować.
              </p>
              <a
                onClick={() => navigate("/login")}
                href=""
                className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
              >
                Zaloguj się
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
