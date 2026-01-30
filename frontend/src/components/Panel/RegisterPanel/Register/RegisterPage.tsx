import React from "react";
import FormInput from "../../../shared/FormInput/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver/useYupValidationResolver";
import { registerSchema } from "../schemas";
import usePostApi from "../../../../hooks/api/post/useApiPost";
import { URL } from "../../../../constants";
import toast from "react-hot-toast";

interface RegisterFormFields {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormFields>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: useYupValidationResolver<RegisterFormFields>(registerSchema),
    mode: "onTouched",
  });
  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = form;

  const linkRegister = "api/auth/register";
  const {
    mutateAsync: mutateAsyncRegister,
    isLoading,
    isSuccess,
  } = usePostApi<RegisterFormFields, any, any>({
    link: `${URL}${linkRegister}`,
    invalidateKeys: [["userRegister"]],
  });

  const onSubmit = handleSubmit(async (data: RegisterFormFields) => {
    try {
      await mutateAsyncRegister({
        bodyData: data,
        successMessage: "Zarejestrowano użytkownika!",
        errorMessage: "Nie udało się zarejestrować użytkownika",
      });

      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {!isSuccess ? (
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
                      type="password"
                      name="password"
                      label="Hasło"
                      className="mb-2"
                      errors={errors}
                      rules={{}}
                    />
                    <FormInput<any>
                      id="confirmPassword"
                      // @ts-ignore
                      type="password"
                      name="confirmPassword"
                      label="Potwierdź hasło"
                      className="mb-2"
                      errors={errors}
                      rules={{}}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`
                      relative w-full py-3 px-6 rounded-xl font-bold text-white tracking-wide
                      transition-all duration-200 shadow-md
                      ${
                        isValid
                          ? "bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200 active:scale-[0.98] cursor-pointer"
                          : "bg-emerald-900/20 text-emerald-900/40 cursor-not-allowed shadow-none"
                      }
                    `}
                    disabled={!isValid}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Rejestrowanie...
                      </span>
                    ) : (
                      "Zarejestruj się"
                    )}
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

export default RegisterPage;
