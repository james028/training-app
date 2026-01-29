import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../../shared/FormInput/FormInput";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver/useYupValidationResolver";
import { loginSchema } from "../schemas";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../appContext/appContext";
import usePostApi from "../../../../hooks/api/post/useApiPost";
import { URL } from "../../../../constants";
import { useQueryClient } from "@tanstack/react-query";

interface LoginFormFields {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleChangeAuth } = useAppContext();

  const form = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: useYupValidationResolver<LoginFormFields>(loginSchema),
    mode: "onTouched",
  });
  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = form;

  const linkRegister = "api/auth/login";
  const { mutateAsync: mutateAsyncLogin } = usePostApi<
    LoginFormFields,
    any,
    any
  >({
    link: `${URL}${linkRegister}`,
    queryKey: ["userLogin"],
  });

  const onSubmit = handleSubmit(async (data: LoginFormFields) => {
    try {
      const responseData = await mutateAsyncLogin({
        bodyData: data,
        successMessage: "Zalogowano użytkownika!",
        errorMessage: "Nie udało się zalogować",
      });

      console.log(responseData);
      if (responseData) {
        handleChangeAuth(responseData);
        queryClient.clear();
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      //toast.error(error);
      console.log(error);
    }
  });

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Zalogus się
          </h1>
          <FormProvider {...form}>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <FormInput<any>
                  id="email"
                  // @ts-ignore
                  type="email"
                  name="email"
                  label="Email"
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
                Zaloguj
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Zapomniałeś hasło?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Przypomnij
                </a>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
