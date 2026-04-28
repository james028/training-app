import React, { useState } from "react";
import useGetApi from "../../hooks/api/get/useApiGet";
import { API_ENDPOINTS, URL } from "../../constants";
import { CHECKLIST_KEYS } from "../../constants/query-keys";
import { useToastError } from "../../hooks/useToastError/useToastError";
import { useAppContext } from "../../appContext/appContext";
import usePatchApi from "../../hooks/api/patch/useApiPatch";
import useDeleteApi from "../../hooks/api/delete/useApiDelete";
import toast from "react-hot-toast";
import usePostApi from "../../hooks/api/post/useApiPost";

type Item = {
  id: string;
  text: string;
  order: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodoSet = {
  id: string;
  name: string;
  order: number;
  items: Item[];
};

type SetsResponse = {
  sets: TodoSet[];
};

const SimpleCheckList = () => {
  const [newItemText, setNewItemText] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [selectedRadioId, setSelectedRadioId] = useState("");

  const { auth } = useAppContext();
  const token = auth?.data?.accessToken;

  const {
    data: checkListData,
    isLoading,
    isError,
    error,
  } = useGetApi<SetsResponse>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.LIST}`,
    queryKey: CHECKLIST_KEYS.checkList(),
    headers: { Authorization: `Bearer ${token}` },
  });
  useToastError(isError, error);
  const checkListItems = checkListData?.sets ?? [];

  console.log(selectedRadioId);
  const { mutateAsync: createNewSetMutate } = usePostApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.CREATE_SET}`,
    invalidateKeys: [CHECKLIST_KEYS.checkList()],
    headers: { Authorization: `Bearer ${token}` },
  });

  const { mutateAsync: createMutate } = usePostApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.CREATE(selectedRadioId)}`,
    invalidateKeys: [CHECKLIST_KEYS.checkList()],
    headers: { Authorization: `Bearer ${token}` },
  });

  const { mutateAsync: editMutate } = usePatchApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.TOGGLE(selectedRadioId, togglingId)}`,
    invalidateKeys: [CHECKLIST_KEYS.checkList()],
    headers: { Authorization: `Bearer ${token}` },
  });

  const { mutateAsync: removeMutate } = useDeleteApi<any, any, any>(
    `${URL}${API_ENDPOINTS.CHECKLIST.DELETE_ITEM(selectedRadioId, removingId)}`,
    [CHECKLIST_KEYS.checkList()],
    null,
    { Authorization: `Bearer ${token}` },
  );

  const { mutateAsync: removeMutateSet } = useDeleteApi<any, any, any>(
    `${URL}${API_ENDPOINTS.CHECKLIST.DELETE_SET(selectedRadioId)}`,
    [CHECKLIST_KEYS.checkList()],
    null,
    { Authorization: `Bearer ${token}` },
  );

  const handleAddNewItem = async () => {
    if (!newItemText.trim()) return;
    try {
      await createMutate({
        bodyData: { text: newItemText },
      });
      toast.success("Dodano!");
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    } finally {
      setNewItemText("");
    }
  };

  const handleAddNewSet = async () => {
    try {
      await createNewSetMutate({ bodyData: { setName: null } });
      toast.success("Dodano nowy set!");
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    }
  };

  const handleToggle = async (
    setId: string,
    itemId: string,
    completed: boolean,
  ) => {
    try {
      setSelectedRadioId(setId);
      setTogglingId(itemId);
      await editMutate({
        bodyData: { completed },
      });
      toast.success("Edytowano!");
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteSet = async (setId: string) => {
    try {
      setSelectedRadioId(setId);
      await removeMutateSet({});
      toast.success("Usunięto set!");
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    }
  };

  const handleDelete = async (setId: string, itemId: string) => {
    try {
      setSelectedRadioId(setId);
      setRemovingId(itemId);
      await removeMutate({});
      toast.success("Usunięto!");
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    } finally {
      setRemovingId(null);
    }
  };

  const restCount = 5;
  const totalCount = 12;
  const width = `${(restCount / totalCount) * 100}`;

  const renderStatusBar = (data: TodoSet) => {
    if (!data) return "Brak";

    const { items } = data;
    const restCount = items.filter((item) => !item.completed).length;
    const totalCount = items.length;
    const width = `${(restCount / totalCount) * 100}`;

    return (
      <>
        <p className="text-gray-600">
          Zostało: {restCount} z {totalCount}
        </p>
        {restCount > 0 && (
          <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-green-500 h-full transition-all duration-300"
              style={{
                width: `${width}%`,
              }}
            />
          </div>
        )}
      </>
    );
  };

  const addNewSetButton = () => {
    return (
      <button
        onClick={handleAddNewSet}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Dodaj nowy set
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  if (checkListItems?.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Brak zadań. Dodaj pierwsze!
        {addNewSetButton()}
      </div>
    );
  }

  const renderSetItems = (data: TodoSet) => {
    if (data.items.length === 0) {
      return <p className="text-gray-600 text-sm mb-4">Brak danych w secie</p>;
    } else {
      return data.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
        >
          <label className="flex-shrink-0 cursor-pointer">
            <input
              type="checkbox"
              checked={item.completed ?? false}
              onChange={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleToggle(data.id, item.id, event.target.checked);
              }}
              className="hidden peer"
            />

            <div
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all
              ${
                item.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 hover:border-green-400"
              }
              peer-focus:ring-2 peer-focus:ring-green-300
            `}
            >
              {item.completed && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </label>
          <span
            className={`flex-1 ${
              item.completed ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {item.text}
          </span>

          <button
            onClick={() => handleDelete(data.id, item.id)}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Moja Checklista
            </h1>
          </div>
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              //onKeyPress={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Dodaj nowy punkt..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddNewItem}
              disabled={!newItemText.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Dodaj
            </button>
          </div>

          <div className="space-y-2">
            {checkListItems.map((checklistItem) => {
              return (
                <div key={checklistItem.id}>
                  {renderStatusBar(checklistItem)}
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition group">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={checklistItem.id}
                        value={checklistItem.id}
                        checked={selectedRadioId === checklistItem.id}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setSelectedRadioId(event.target.value)}
                      />
                      <span className="text-sm text-gray-800">
                        {checklistItem.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleDeleteSet(checklistItem.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 7h12M9 7v10m6-10v10M10 4h4"
                        />
                      </svg>
                    </button>
                  </label>
                  <div>{renderSetItems(checklistItem)}</div>
                </div>
              );
            })}
            {addNewSetButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCheckList;
