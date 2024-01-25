import React from "react";
import Modal from "../../shared/Modal/Modal";
import AddTrainingForm from "../AddTrainingForm/AddTrainingForm";

const EditTraining = ({
  isOpenModal,
  setOpenModal,
  closeModal,
  modalTitle,
  eventData,
}: {
  isOpenModal: boolean;
  setOpenModal: any;
  closeModal: any;
  modalTitle: string;
  eventData?: Record<any, any>;
}) => {
  return (
    <>
      {isOpenModal ? (
        <Modal
          openModal={setOpenModal}
          closeModal={closeModal}
          modalTitle={modalTitle}
        >
          <AddTrainingForm closeModal={closeModal} />
        </Modal>
      ) : null}
    </>
  );
};

export default EditTraining;
