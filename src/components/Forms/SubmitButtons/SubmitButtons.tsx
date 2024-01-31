import React from "react";

const SubmitButtons = ({
  closeModal,
  saveChanges,
}: {
  closeModal: () => void;
  saveChanges?: () => void;
}) => {
  return (
    <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b p-2">
      <button
        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        type="button"
        onClick={closeModal}
      >
        Close
      </button>
      <button
        className="inline-block rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        type="submit"
        onClick={saveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

export default SubmitButtons;
