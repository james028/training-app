import React from "react";

const EditButtons = ({
  isEdit,
  endEdit,
  startEdit,
}: {
  isEdit: boolean;
  endEdit: () => void;
  startEdit: () => void;
}) => {
  return (
    <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b p-2">
      {isEdit ? (
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={endEdit}
        >
          Zakończ edytowanie
        </button>
      ) : null}
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={startEdit}
      >
        Edytuj trening
      </button>
    </div>
  );
};

export default EditButtons;
