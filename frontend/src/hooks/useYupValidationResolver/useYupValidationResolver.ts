import React, { useCallback } from "react";
import { AnySchema } from "yup";

type ValidationErrors = Record<string, { type: string; message: string }>;

export const useYupValidationResolver = <TData extends {}>(
  validationSchema: any,
) =>
  React.useCallback(
    async (data: TData) => {
      console.log(validationSchema, "val");
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
