import React, { useState } from "react";
import styled from "styled-components";

import EditTraining from "../../Forms/EditTraining/EditTraining";
import AddTraining from "../../Forms/AddTraining/AddTraining";
import { StyledContainerDay } from "./style";
import useGetApi from "../../../hooks/api/get/useApiGet";
import { TDay } from "../../../types";

type TCalendarDay = {
  data: TDay[];
  day: string;
};

export const StyledTypeContainer = styled.div<{
  hexcolor: string | undefined | null;
}>`
  background-color: ${(props) => (props.hexcolor ? `${props.hexcolor}` : null)};
`;

const URL = "http://localhost:5001/";

const CalendarDay = ({ data, day }: TCalendarDay) => {
  const [openModalEditTraining, setOpenModalEditTraining] = useState(false);
  const [openModalAddTraining, setOpenModalAddTraining] = useState(false);
  const [eventData, setEventData] = useState<Record<any, any>>({});

  const link = "api/training-type/list";
  const { data: dataTrainingType } = useGetApi(
    `${URL}${link}`,
    ["trainingTypeList"],
    undefined,
  );

  const handleEditTraining = (event: TDay): void => {
    setOpenModalEditTraining(true);
    setEventData(event);
  };

  const handleAddTraining = (): void => {
    setOpenModalAddTraining(true);
  };

  //albo to będzie po id, ale to juz jak zrobie nie mockowe dane, wydaje mi sie ze po id
  const findColor = (eventType: string): string | undefined | null => {
    //console.log(dataTrainingType, "data");
    if (!dataTrainingType?.length) return;

    const findData = dataTrainingType.find(
      (type: any) => type.trainingName === eventType,
    );

    return findData?.color || null;
  };

  const renderEvents = () => {
    if (data?.length > 3) {
      return <div className="flex items-center align-items">+3</div>;
    } else {
      if (data?.length > 0) {
        return data?.map((event: TDay, index1: any) => {
          //console.log(findColor(event.type), "s", event.type);
          return (
            <StyledTypeContainer
              //zmienic, jak będzie id z danych z TDay z BE
              key={index1}
              hexcolor={null}
              //hexcolor={findColor(event.type)}
              className="px-2 py-0.5 text-sm rounded-lg mt-1 overflow-hidden border border-blue-200 text-blue-800 bg-blue-100 cursor-pointer"
              //className="px-2 py-0.5 text-sm rounded-lg mt-1 overflow-hidden border border-blue-200 text-white cursor-pointer"
              onClick={() => handleEditTraining(event)}
            >
              <div className="flex items-center justify-between">
                <span>{event.type}</span>
                <svg
                  className="h-6 w-6 inline-flex leading-none text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </StyledTypeContainer>
          );
        });
      }
    }
  };

  return (
    <StyledContainerDay className="px-4 pt-2 border-r border-b relative cursor-pointer">
      {day !== "00" ? (
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500"
          onClick={handleAddTraining}
        >
          <span className="text-white">{Number(day)}</span>
        </div>
      ) : null}
      {renderEvents()}
      {openModalEditTraining ? (
        <EditTraining
          isOpenModal={openModalEditTraining}
          setOpenModal={setOpenModalEditTraining}
          closeModal={() => setOpenModalEditTraining(false)}
          modalTitle={"Trening z dnia: "}
          eventData={eventData}
        />
      ) : null}
      {openModalAddTraining ? (
        <AddTraining
          isOpenModal={openModalAddTraining}
          setOpenModal={setOpenModalEditTraining}
          closeModal={() => setOpenModalAddTraining(false)}
          modalTitle={"Dodaj trening"}
          day={day}
        />
      ) : null}
    </StyledContainerDay>
  );
};
export default CalendarDay;

// :class="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }"
