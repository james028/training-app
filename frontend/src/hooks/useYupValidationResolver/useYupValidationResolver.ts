import { useCallback } from "react";
import { Resolver } from "react-hook-form";
import { AnyObjectSchema, ValidationError } from "yup";

export const useYupValidationResolver = <T extends Record<string, any>>(
  validationSchema: AnyObjectSchema,
): Resolver<T> =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        if (errors instanceof ValidationError) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path as string]: {
                  type: currentError.type ?? "validation",
                  message: currentError.message,
                },
              }),
              {},
            ),
          };
        }
        throw errors;
      }
    },
    [validationSchema],
  );
