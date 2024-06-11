import React, { useRef } from "react";

const Modal = ({ children, closeModal, modalTitle, openModal }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<any | null>(null);

  //useOnClickOutside(ref, () => closeModal());

  // const { handleKeyDown } = useClickEscapeToClose(
  //   dialogRef,
  //   closeModal,
  //   openModal,
  // );

  return (
    <div ref={dialogRef}>
      <div
        ref={ref}
        className="justify-center items-center flex overflow-x-hidden fixed overflow-y-auto inset-0 z-50 outline-none focus:outline-none"
      >
        <div
          className="relative w-auto my-6 mx-auto"
          style={{ maxWidth: "448px", width: "448px" }}
        >
          <div className="border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{modalTitle}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => null}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Modal;
