import React, { useMemo, useState } from "react";
import styled from "styled-components";

import EditTraining from "../../Forms/EditTraining/EditTraining";
import AddTraining from "../../Forms/AddTraining/AddTraining";
import { StyledContainerDay } from "./style";
import { TCalendarDay, TDay } from "../../../types";

export const StyledTypeContainer = styled.div<{
  hexcolor: string | undefined | null;
}>`
  background-color: ${(props) => (props.hexcolor ? `${props.hexcolor}` : null)};
`;

const CalendarDay = ({
  data,
  day,
  isEmpty,
  trainingDataColor,
}: TCalendarDay) => {
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

  const colorLookup = useMemo(() => {
    if (!trainingDataColor?.length) {
      return { default: "#3b82f6" };
    }

    return trainingDataColor.reduce(
      (acc, type) => {
        acc[type.type] = type.color;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [trainingDataColor]);

  //console.log(colorLookup);

  const getColor = (eventType: string): string => {
    return colorLookup[eventType] || colorLookup.default;
  };

  const renderEvents = () => {
    if (data.length > 3) {
      return <div className="flex items-center">+3</div>;
    } else {
      if (data.length > 0) {
        return data.map((event: TDay) => {
          const { type } = event;

          return (
            <StyledTypeContainer
              key={event.id}
              hexcolor={getColor(type)}
              className="px-2 py-0.5 text-sm rounded-lg mt-1 overflow-hidden border border-blue-200 text-blue-800 bg-blue-100 cursor-pointer"
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
    <StyledContainerDay
      className={`px-4 pt-2 border-r border-b relative 
      ${
        !isEmpty
          ? "cursor-pointer bg-white"
          : "bg-gray-50 border-gray-200 pointer-events-none"
      }
    `}
    >
      {!isEmpty ? (
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
          trainingDataType={trainingDataColor}
        />
      ) : null}
    </StyledContainerDay>
  );
};
export default CalendarDay;

// :class="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }"
