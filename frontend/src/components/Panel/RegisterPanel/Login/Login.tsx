import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../../shared/FormInput/FormInput";
import { useYupValidationResolver } from "../../../../hooks/useYupValidationResolver/useYupValidationResolver";
import { loginSchema } from "../schemas";
import usePostApi, { Status } from "../../../../hooks/api/post/useApiPost";
import { useNavigate } from "react-router-dom";

type LoginFormFields = {
  email: string;
  password: string;
};

const URL = "http://localhost:5001/";

const Login = () => {
  const [test, setTest] = useState<any>({});
  const navigate = useNavigate();

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
  const { responseStatus, mutation: createMutation } = usePostApi(
    `${URL}${linkRegister}`,
    ["userLogin"],
    null,
  );

  const authenticate = (data: any, next?: () => void) => {
    // Storing JWT token in user's browser
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      if (next) {
        next();
      }
    }
  };

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const { data: data2 } = await createMutation.mutateAsync({
        paramsObj: null,
        bodyData: data,
      });

      if (!data2) return;

      if (data2) {
        console.log(data2, "123data");
        setTest(data2);
        authenticate(data2);
      }

      //po zalogowaniu przeniesienie do dashboard

      //console.log(responseStatus, "response");
      setTimeout(async () => {
        reset();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  });

  //poszukać moze jakiegoś innego rozwiązania
  //useEffect(() => {
  //if (responseStatus === Status.SUCCESS) {
  //navigate("/dashboard");
  //}
  //}, [responseStatus]);

  // if (responseStatus === Status.SUCCESS) {
  //   navigate("/dashboard");
  // }

  // if (responseStatus === Status.SUCCESS) {
  //   return <div>Logout</div>;
  // }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {test.email} {test.username}
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
