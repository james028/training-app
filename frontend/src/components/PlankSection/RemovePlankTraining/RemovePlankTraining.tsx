import React from "react";
import { usePlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import SubmitButtons from "../../Forms/SubmitButtons/SubmitButtons";
import useGetApi from "../../../hooks/api/get/useApiGet";
import useDeleteApi from "../../../hooks/api/delete/useApiDelete";
import { useAppContext } from "../../../appContext/appContext";
import { MONTH_NAMES_MAP } from "../../../constants";

type RemovePlankTrainingProps = {
  closeModal: () => void;
};

const URL = "http://localhost:5001/";
//const DELETE_URL = "http://localhost:5001/api/plank/delete";

const RemovePlankTraining = ({ closeModal }: RemovePlankTrainingProps) => {
  const {
    objectData: { month, day, duration, _id: id },
  } = usePlankSectionContext();
  const { link } = useAppContext();

  const { mutate } = useDeleteApi(
    `${URL}${link}/delete`,
    ["deletePlank"],
    undefined,
  );

  const { refetch: refetchList } = useGetApi(
    `${URL}${link}/list`,
    ["plankList"],
    undefined,
  );

  const submitDeleteRequest = (): void => {
    const paramsObject = {
      id,
      month,
    };

    mutate({ paramsObj: paramsObject });
    setTimeout(async () => {
      await refetchList?.();
    }, 500);
    closeModal();
  };

  return (
    <>
      <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
        <div className="text-base text-neutral-600 dark:text-neutral-200 cursor-default">
          Czy chcesz usunąć trening z miesiąca{" "}
          {MONTH_NAMES_MAP[month as unknown as keyof typeof MONTH_NAMES_MAP]} z
          dnia {day} o dlugosci {duration}?
        </div>
      </div>
      <SubmitButtons
        closeModal={closeModal}
        saveChanges={submitDeleteRequest}
        submitTitle={"Usuń"}
      />
    </>
  );
};

export default RemovePlankTraining;
