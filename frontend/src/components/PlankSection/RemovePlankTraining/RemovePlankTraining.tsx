import React from "react";
import { usePlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import { monthObject } from "../../../utils/utils";
import SubmitButtons from "../../Forms/SubmitButtons/SubmitButtons";

type RemovePlankTrainingProps = {
  closeModal: () => void;
};

const RemovePlankTraining = ({ closeModal }: RemovePlankTrainingProps) => {
  const {
    objectData: { month, day, duration },
  } = usePlankSectionContext();

  return (
    <>
      <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
        <div className="text-base text-neutral-600 dark:text-neutral-200 cursor-default">
          Czy chcesz usunąć trening z miesiąca{" "}
          {monthObject[month as unknown as keyof typeof monthObject]} z dnia{" "}
          {day} o dlugosci {duration}?
        </div>
      </div>
      <SubmitButtons closeModal={closeModal} />
    </>
  );
};

export default RemovePlankTraining;
