import React from "react";
import FormInput from "../shared/FormInput/FormInput";
import { HexColorPicker } from "react-colorful";
import { FormProvider } from "react-hook-form";
import { StyledColorRectangle } from "./style";
import ActivityTypeList from "./ActivityTypeList/ActivityTypeList";
import { hexToRgba } from "../../utils";
import Modal from "../shared/Modal/Modal";
import SubmitButtons from "../Forms/SubmitButtons/SubmitButtons";
import { useActivityType } from "./hooks/useActivityType";

const ActivityTypePage = () => {
  const {
    form,
    getList,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    onSubmitCreate,
    onSubmitDelete,
    editingId,
    isOpenRemoveModal,
    setIsOpenRemoveModal,
  } = useActivityType();
  const { data: activityData, isLoading, isRefetching, isError } = getList;
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = form;
  const currentColor = watch("color");

  const isEditing = Boolean(editingId);
  const isBtnDisabled = !isValid || isSubmitting;
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Dodaj typ treningu:
      </h2>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmitCreate)}>
          <FormInput<any>
            id="activityName"
            name="activityName"
            label="Typ treningu"
            className="mb-2 w-2/5"
            errors={errors}
          />
          <div className="flex">
            <HexColorPicker
              color={currentColor}
              onChange={(newColor) =>
                setValue("color", newColor, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
            {currentColor ? (
              <div className=" flex flex-col ml-3">
                <StyledColorRectangle
                  color={currentColor}
                ></StyledColorRectangle>
                <div>
                  Hex wybranego koloru to{" "}
                  <span className="font-bold">{currentColor}</span>
                </div>
                <div>
                  Rgba wybranego koloru to{" "}
                  <span className="font-bold">{hexToRgba(currentColor)}</span>
                </div>
              </div>
            ) : null}
          </div>
          <button
            disabled={isBtnDisabled}
            className={`
              mt-3 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 transition-all
              ${
                !isBtnDisabled
                  ? isEditing
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-95"
                  : "bg-gray-300 cursor-not-allowed text-gray-100 shadow-none"
              }
            `}
            type="submit"
          >
            {isSubmitting
              ? isEditing
                ? "Zapisywanie..."
                : "Dodawanie..."
              : isEditing
                ? "Zapisz zmiany"
                : "Dodaj typ"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-sm"
            >
              Anuluj
            </button>
          )}
        </form>
      </FormProvider>

      <ActivityTypeList
        dataActivityType={activityData}
        isLoading={isLoading}
        isError={isError}
        isRefetching={isRefetching}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isOpenRemoveModal ? (
        <Modal
          openModal={() => setIsOpenRemoveModal(true)}
          closeModal={() => setIsOpenRemoveModal(false)}
          modalTitle={"Usuwanie aktywności"}
        >
          <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
            <div className="text-base text-neutral-600 dark:text-neutral-200 cursor-default">
              Czy napewno chcesz usunąć aktywność?
            </div>
          </div>
          <SubmitButtons
            closeModal={() => setIsOpenRemoveModal(false)}
            saveChanges={() => onSubmitDelete()}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default ActivityTypePage;
