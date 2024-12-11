import React from "react";
import Modal from "../../shared/Modal/Modal";
import AddTrainingForm from "../AddTrainingForm/AddTrainingForm";

const AddTraining = ({
  isOpenModal,
  setOpenModal,
  closeModal,
  modalTitle,
  eventData,
  day,
}: {
  isOpenModal: boolean;
  setOpenModal: any;
  closeModal: any;
  modalTitle: string;
  eventData?: Record<any, any>;
  day: string;
}) => {
  //eventData w dół dla testu
  return (
    <>
      {isOpenModal ? (
        <Modal
          openModal={setOpenModal}
          closeModal={closeModal}
          modalTitle={modalTitle}
        >
          <AddTrainingForm closeModal={closeModal} day={day} />
        </Modal>
      ) : null}
    </>
  );
};

export default AddTraining;
