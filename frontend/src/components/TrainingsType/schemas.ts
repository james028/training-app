import * as yup from "yup";

export const activitySchema = yup
  .object({
    activityName: yup
      .string()
      .required("Nazwa treningu jest wymagana")
      .min(3, "Nazwa musi mieć przynajmniej 3 znaki")
      .max(50, "Nazwa jest za długa"),

    color: yup
      .string()
      .required("Musisz wybrać kolor")
      .matches(/^#[0-9A-F]{6}$/i, "Niepoprawny format koloru"),
  })
  .required();
