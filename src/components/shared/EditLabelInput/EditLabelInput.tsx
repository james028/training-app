import React from "react";

const EditLabelInput = ({
  label,
  isEdit,
  childrenInput,
  eventDataField,
}: any) => {
  return (
    <>
      {!isEdit ? (
        <>
          <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
            {label}
          </label>
          <div className="text-base text-neutral-600 dark:text-neutral-200 cursor-default">
            {eventDataField ?? "-"}
          </div>
        </>
      ) : (
        <>{childrenInput}</>
      )}
    </>
  );
};

export default EditLabelInput;
