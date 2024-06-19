import React from "react";

const SubmitButtons = ({
  closeModal,
  saveChanges,
  submitTitle,
  closeTitle,
}: {
  closeModal: () => void;
  saveChanges?: (e: any) => void;
  submitTitle?: string;
  closeTitle?: string;
}) => {
  return (
    <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b p-2">
      <button
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={closeModal}
      >
        {closeTitle || "Zamknij"}
      </button>
      <button
        className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        type="submit"
        onClick={saveChanges}
      >
        {submitTitle || "Zapisz zmiany"}
      </button>
    </div>
  );
};

///tutaj disabled jesli formularz na show a nie edit

export default SubmitButtons;
