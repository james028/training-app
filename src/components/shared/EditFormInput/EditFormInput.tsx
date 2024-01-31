import React from "react";

const EditFormInput = ({
  label,
  isEdit,
  childrenInput,
  eventDataField,
}: any) => {
  return (
    <>
      <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
        {label}
      </label>
      {isEdit ? (
        <>{childrenInput}</>
      ) : (
        <p className="text-base text-neutral-600 dark:text-neutral-200">
          {eventDataField ?? "-"}
        </p>
      )}
    </>
  );
};

export default EditFormInput;
