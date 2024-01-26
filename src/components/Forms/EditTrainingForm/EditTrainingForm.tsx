import React from "react";
import SubmitButtons from "../SubmitButtons/SubmitButtons";

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
      <SubmitButtons closeModal={closeModal} />
    </div>
  );
};

export default EditTrainingForm;
