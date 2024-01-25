import React from "react";
import Modal from "../../shared/Modal/Modal";

const AddTrainingForm = ({
  openModal,
  closeModal,
  modalTitle,
  eventData,
}: any) => {
  return (
    <>
      {openModal ? (
        <Modal closeModal={closeModal} modalTitle={modalTitle}>
          <div>children modala</div>
          <div>{eventData?.bikeKilometers}</div>
          <div>{eventData?.bikeType}</div>
          <div>{eventData?.duration}</div>
          <div>{eventData?.type}</div>
          <button onClick={closeModal}>Close</button>
        </Modal>
      ) : null}
    </>
  );
};

export default AddTrainingForm;
