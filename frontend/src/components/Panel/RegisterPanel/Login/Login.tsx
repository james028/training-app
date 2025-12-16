import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../../shared/FormInput/FormInput";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver/useYupValidationResolver";
import { loginSchema } from "../schemas";
import usePostApi, { Status } from "../../../../hooks/api/post/useApiPost";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../appContext/appContext";
import { URL } from "../../../../constants";

type LoginFormFields = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const { addUser } = useAppContext();

  const form = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: useYupValidationResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const linkRegister = "api/auth/login";
  // const { responseStatus, mutateAsync } = usePostApi({
  //   link: `${URL}${linkRegister}`,
  //   queryKey: ["userLogin"],
  // });

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      // const data = await mutateAsync({
      //   paramsObj: null,
      //   bodyData: data,
      //   successMessage: "Zalogowano użytkownika!",
      //   errorMessage: "nie udało się zalogować",
      // });
      // console.log(responseData, "reeeeeeeee");
      //
      // if (data) {
      //   addUser(data);
      //   setTimeout(async () => {
      //     reset();
      //   }, 500);
      //   //navigate("/dashboard");
      // }
    } catch (error) {
      //toast.error(error);
      console.log(error);
    }
  });

  // useEffect(() => {
  //   if (responseStatus === Status.SUCCESS) {
  //     navigate("/dashboard");
  //   }
  // }, [responseStatus]);

  console.log("login mount comp");

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {
            <>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Zalogus się
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
                      id="password"
                      // @ts-ignore
                      type="text"
                      name="password"
                      label="Hasło"
                      className="mb-2"
                      errors={errors}
                      rules={{}}
                    />
                  </div>
                  <button
                    type="submit"
                    className=" bg-blue-500 md:bg-green-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
