import React from "react";

const EditTrainingForm = ({ eventData, closeModal }: any) => {
  return (
    <div>
      <div>
        <div>Typ treningu</div>
        <div className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {eventData?.type}
        </div>
      </div>
      <div>
        <div>Typ treningu</div>
        <div className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {eventData?.duration}
        </div>
      </div>
      <div>
        <div>Typ treningu</div>
        <div className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {eventData?.bikeType}
        </div>
      </div>
      <div className="flex">
        <div>Typ treningu</div>
        <div className="text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {eventData?.bikeKilometers}
        </div>
      </div>
      <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => null}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditTrainingForm;
