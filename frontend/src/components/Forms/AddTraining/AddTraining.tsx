import React from "react";
import Modal from "../../shared/Modal/Modal";
import AddTrainingForm from "../AddTrainingForm/AddTrainingForm";
import { TrainingTypeColor } from "../../../types";

const AddTraining = ({
  isOpenModal,
  setOpenModal,
  closeModal,
  modalTitle,
  eventData,
  day,
  trainingDataType,
}: {
  isOpenModal: boolean;
  setOpenModal: any;
  closeModal: any;
  modalTitle: string;
  eventData?: Record<any, any>;
  day: string | null;
  trainingDataType: TrainingTypeColor[];
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
