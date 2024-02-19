import React, { FC } from "react";

export type FormErrorMessageProps = {
  children: any;
  className?: string;
};

const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p className={`font-serif text-sm text-left block text-red-600 ${className}`}>
    {children}
  </p>
);

export default FormErrorMessage;
