import React from "react";
import Modal from "../../shared/Modal/Modal";
import EditTrainingForm from "../EditTrainingForm/EditTrainingForm";
import { ActivityType } from "../../../types";

const EditTraining = ({
  isOpenModal,
  setOpenModal,
  closeModal,
  modalTitle,
  eventData,
  day,
  trainingDataType,
}: {
  isOpenModal: any;
  setOpenModal: any;
  closeModal: any;
  modalTitle: string;
  eventData?: Record<any, any>;
  day: any;
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
          <EditTrainingForm
            eventData={eventData}
            day={day}
            trainingDataType={trainingDataType}
            closeModal={closeModal}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default EditTraining;
