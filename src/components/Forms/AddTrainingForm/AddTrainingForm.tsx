import React from "react";
import Modal from "../../shared/Modal/Modal";
import EditTrainingForm from "../EditTrainingForm/EditTrainingForm";
import SubmitButtons from "../SubmitButtons/SubmitButtons";

const AddTrainingForm = ({ closeModal }: any) => {
  return (
    <>
      <div className="md:p-8 mb-2">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-5">
            <label htmlFor="full_name">Typ treningu</label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
            />
          </div>
          <div className="md:col-span-5">
            <label htmlFor="full_name">Długość treningu</label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value=""
            />
          </div>
        </div>
      </div>
      <SubmitButtons closeModal={closeModal} />
    </>
  );
};

export default AddTrainingForm;
