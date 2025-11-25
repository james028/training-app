import React, { RefObject, useEffect, useState } from "react";
import { TCalendarData } from "../types";

export const useCountNestedEventsByType = (
  data: TCalendarData,
): { resultsEventArray: any; resultByMonthIndex: any; result: any } => {
  const result: Record<string, number> = {};
  const resultByMonthIndex: Record<string, object> = {};
  const resultsEventArray: any = [];

  for (const yearKey in data) {
    const monthsData = data[yearKey];

    monthsData.forEach((monthEntry) => {
      for (const monthKey in monthEntry) {
        const events = monthEntry[monthKey];

        const obj: any = {};

        events.forEach((nestedEvent) => {
          if (nestedEvent && Object.keys(nestedEvent).length > 0) {
            Object.keys(nestedEvent).forEach((nestedKey) => {
              const nestedEventsOfType = nestedEvent[nestedKey].filter(
                (event) => event && event.type,
              );

              nestedEventsOfType.forEach((event: { type: any }) => {
                let eventType = event.type;

                if (!obj[eventType]) {
                  obj[eventType] = 0;
                }
                obj[eventType]++;

                resultByMonthIndex[monthKey] = obj;

                //jęsli suma wszystkich treningów
                if (!result[eventType]) {
                  result[eventType] = 0;
                }
                result[eventType]++;
              });
            });
          }
        });
      }
    });
  }

  resultsEventArray.push(resultByMonthIndex);

  return { resultsEventArray, resultByMonthIndex, result };
};
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

export const useClickEscapeToClose = (
  ref: any,
  closeModal: any,
  openModal: any,
) => {
  const [isModalOpen, setModalOpen] = useState(openModal);
  const handleCloseModal = () => {
    if (closeModal) {
      closeModal();
    }
  };

  useEffect(() => {
    setModalOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    const modalElement = ref.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handler = (event: { target: any }) => {
      if (!ref.current) {
        return;
      }
      if (!ref.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return { handleKeyDown };
};
