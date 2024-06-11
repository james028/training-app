import React, { useState } from "react";

import { TDay } from "../../../types/app-types";

import styled from "styled-components";
import EditTraining from "../../Forms/EditTraining/EditTraining";
import AddTraining from "../../Forms/AddTraining/AddTraining";

type TCalendarDay = {
  data: TDay[];
  day: string;
};

const StyledContainerDay = styled.div`
  min-height: 140px;
  width: 14.28%;
`;

const CalendarDay = ({ data, day }: TCalendarDay) => {
  const [openModalEditTraining, setOpenModalEditTraining] = useState(false);
  const [openModalAddTraining, setOpenModalAddTraining] = useState(false);
  const [eventData, setEventData] = useState<Record<any, any>>({});

  const handleEditTraining = (event: TDay): void => {
    setOpenModalEditTraining(true);
    setEventData(event);
  };

  const handleAddTraining = (): void => {
    setOpenModalAddTraining(true);
  };

  const renderEvents = () => {
    if (data?.length > 3) {
      return <div className="flex items-center align-items">+3</div>;
    } else {
      if (data?.length > 0) {
        return data?.map((event: TDay, index1: any) => {
          return (
            <div
              //zmienic, jak będzie id z danych z TDay z BE
              key={index1}
              className="px-2 py-0.5 text-sm rounded-lg mt-1 overflow-hidden border border-blue-200 text-blue-800 bg-blue-100 cursor-pointer"
              onClick={() => handleEditTraining(event)}
            >
              <div
                className="flex items-center justify-between"
                onClick={() => null}
              >
                <span>{event.type}</span>
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex leading-none"
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
            </div>
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
        />
      ) : null}
    </StyledContainerDay>
  );
};
export default CalendarDay;

// :class="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }"
