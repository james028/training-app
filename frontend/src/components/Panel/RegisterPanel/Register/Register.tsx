import React from "react";
import * as yup from "yup";
import FormInput from "../../../shared/FormInput/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { AnySchema } from "yup";
import { useNavigate } from "react-router-dom";
import usePostApi from "../../../../hooks/api/post/useApiPost";
import { data } from "../../../../mock/plank-mock";

type RegisterFormFields = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

// to do innego pliku takiego folder hooks
type ValidationErrors = Record<string, { type: string; message: string }>;

const useYupValidationResolver = <TData extends {}>(
  validationSchema: AnySchema,
) =>
  React.useCallback(
    async (data: TData) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {} as ValidationErrors,
        };
      } catch (errors) {
        let errorsObject: ValidationErrors;
        //let ValidationErrors;
        //if (errors instanceof ValidationErrors) {
        errorsObject = (errors as any).inner.reduce(
          (
            allErrors: ValidationErrors,
            currentError: { path: string; type: string; message: string },
          ) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type,
              message: currentError.message,
            },
          }),
          {} as ValidationErrors,
        );
        // /}
        return {
          values: {},
          errors: errorsObject,
        };
      }
    },
    [validationSchema],
  );

//schema do innego pliku
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email jest niepoprawny")
    .required("Email jest wymagany"),
  username: yup.string().required("Nazwa użytkownika jest wymagana"),
  password: yup
    .string()
    .min(8, "Hasło musi mieć minumum 8 znaków")
    .max(32, "Hasło musi mieć maksymalnie 32 znaki")
    .required("Hasło jest wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Hasła się nie zgadzają "),
});

const URL = "http://localhost:5001/";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormFields>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: useYupValidationResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const linkRegister = "api/user/register";
  const { mutate, status } = usePostApi(
    `${URL}${linkRegister}`,
    ["userRegister"],
    null,
  );

  const onSubmit = handleSubmit((data: any) => {
    //try {
    console.log(data, "data");

    const { confirmPassword, ...restObjectData } = data;
    mutate({ paramsObj: null, bodyData: restObjectData });

    //if (status === "success") {
    setTimeout(async () => {
      reset();
      //navigate("/dashboard");
    }, 500);
    //}

    //} catch (error) {
    //console.log(error);
    //pozniej tutaj toast ze nie udalo sie zarejestrować
    //}
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
