import React from "react";
import Modal from "../../shared/Modal/Modal";
import AddTrainingForm from "../AddTrainingForm/AddTrainingForm";
import { ActivityType } from "../../../types";

const AddTraining = ({
  isOpenModal,
  setOpenModal,
  closeModal,
  modalTitle,
  day,
  trainingDataType,
}: {
  isOpenModal: boolean;
  setOpenModal: any;
  closeModal: any;
  modalTitle: string;
  eventData?: Record<any, any>;
  day: string | null;
  trainingDataType: ActivityType[];
}) => {
  return (
    <>
      {isOpenModal ? (
        <Modal
          openModal={setOpenModal}
          closeModal={closeModal}
          modalTitle={modalTitle}
        >
          <AddTrainingForm
            closeModal={closeModal}
            day={day}
            trainingDataType={trainingDataType}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default AddTraining;
