import React from "react";
import { usePlankSectionContext } from "../PlankSectionContext/PlankSectionContext";
import SubmitButtons from "../../Forms/SubmitButtons/SubmitButtons";
import { useAppContext } from "../../../appContext/appContext";
import { API_ENDPOINTS, MONTH_NAMES_MAP, URL } from "../../../constants";
import { RemovePlankTrainingProps } from "../../../types";
import toast from "react-hot-toast";
import useDeleteApi from "../../../hooks/api/delete/useApiDelete";
import { PLANK_KEYS } from "../../../constants/query-keys";

const RemovePlankTraining = ({ closeModal }: RemovePlankTrainingProps) => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken;
  const { objectData, setObjectData } = usePlankSectionContext();
  const { data: objectData1 } = objectData;
  const { month, day, duration, id } = objectData1 ?? {};

  const { mutateAsync: removeMutateAsync } = useDeleteApi(
    [PLANK_KEYS.plankList()],
    undefined,
    null,
    { Authorization: `Bearer ${token}` },
  );

  const submitDeleteRequest = async (): Promise<void> => {
    try {
      if (!id) {
        return;
      }
      await removeMutateAsync({
        customLink: `${URL}${API_ENDPOINTS.PLANK.DELETE(id)}`,
      });
      closeModal();
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    } finally {
      setObjectData({ mode: null, data: null });
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

//zrobić tak ze jak klikm w ikonke usuń to to cos z tymi danymi
