import React from "react";
import Modal from "../../shared/Modal/Modal";
import EditTrainingForm from "../EditTrainingForm/EditTrainingForm";

const EditTraining = ({
  isOpenModal,
  setOpenModal,
  closeModal,
  modalTitle,
  eventData,
}: {
  isOpenModal: any;
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
          <EditTrainingForm eventData={eventData} closeModal={closeModal} />
        </Modal>
      ) : null}
    </>
  );
};

export default EditTraining;
