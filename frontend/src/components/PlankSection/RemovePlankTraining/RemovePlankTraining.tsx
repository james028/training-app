import React from "react";
import { usePlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import SubmitButtons from "../../Forms/SubmitButtons/SubmitButtons";
import useGetApi from "../../../hooks/api/get/useApiGet";
import useDeleteApi from "../../../hooks/api/delete/useApiDelete";
import { useAppContext } from "../../../appContext/appContext";
import { MONTH_NAMES_MAP, URL } from "../../../constants";
import { RemovePlankTrainingProps } from "../../../types";
import toast from "react-hot-toast";

const RemovePlankTraining = ({ closeModal }: RemovePlankTrainingProps) => {
  const { link } = useAppContext();
  const { objectData } = usePlankSectionContext();
  const { month, day, duration, _id: id } = objectData ?? {};

  const { mutateAsync } = useDeleteApi(
    `${URL}${link}/delete`,
    ["deletePlank"],
    undefined,
  );

  const { refetch: refetchList } = useGetApi({
    url: `${URL}${link}/list`,
    queryKey: ["plankList"],
  });

  const submitDeleteRequest = async (): Promise<void> => {
    const paramsObject = {
      id,
      month,
    };

    try {
      await mutateAsync({ paramsObject });
      await refetchList?.();
      closeModal();
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    }
  };

  return (
    <>
      <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
        <div className="text-base text-neutral-600 dark:text-neutral-200 cursor-default">
          Czy chcesz usunąć trening z miesiąca{" "}
          <>
            {MONTH_NAMES_MAP[month as unknown as keyof typeof MONTH_NAMES_MAP]}{" "}
            z dnia {day} o dlugosci {duration && duration}?
          </>
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
