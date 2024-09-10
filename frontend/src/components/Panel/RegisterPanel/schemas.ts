import * as yup from "yup";

const loginSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email("Email jest niepoprawny")
      .required("Email jest wymagany"),
    password: yup
      .string()
      .min(8, "Hasło musi mieć minumum 8 znaków")
      .max(32, "Hasło musi mieć maksymalnie 32 znaki")
      .required("Hasło jest wymagane"),
  });

const registerSChema = () => {
  return yup.object().shape({
    username: yup.string().required("Nazwa użytkownika jest wymagana"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Hasła się nie zgadzają "),
  });
};

export const getValidationSchema = ({
  formType,
}: {
  formType: string;
}): Record<string, any> => {
  const validationTypesObject = {
    login: loginSchema,
    register: registerSChema(),
  };

  // @ts-ignore
  return validationTypesObject[formType ?? ""] || null;
};
