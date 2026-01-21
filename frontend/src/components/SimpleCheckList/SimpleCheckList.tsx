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

export type TodoItemDto = {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type GetTodosResponseDto = {
  success: boolean;
  items: TodoItemDto[];
};

const SimpleCheckList = () => {
  const [newItemText, setNewItemText] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;

  const {
    data: checkListData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetApi<GetTodosResponseDto>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.LIST}`,
    queryKey: CHECKLIST_KEYS.checkList(),
    headers: { Authorization: `Bearer ${token}` },
  });
  useToastError(isError, error);

  const checkListItems = checkListData?.items ?? [];

  const { mutateAsync: createMutate } = usePostApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.CREATE}`,
    queryKey: CHECKLIST_KEYS.checkListCreate(),
    headers: { Authorization: `Bearer ${token}` },
  });

  const { mutateAsync: editMutate } = usePatchApi<any, any, any>({
    link: `${URL}${API_ENDPOINTS.CHECKLIST.TOGGLE(togglingId ?? "")}`,
    queryKey: CHECKLIST_KEYS.checkListToggle(togglingId ?? ""),
    headers: { Authorization: `Bearer ${token}` },
  });

  const { mutateAsync: removeMutate } = useDeleteApi<any, any, any>(
    `${URL}${API_ENDPOINTS.CHECKLIST.DELETE(removingId ?? "")}`,
    CHECKLIST_KEYS.checkListDelete(removingId ?? ""),
    null,
    { Authorization: `Bearer ${token}` },
  );

  const handleAdd = async () => {
    if (!newItemText.trim()) return;
    try {
      await createMutate({ bodyData: { text: newItemText } });
      toast.success("Dodano!");
      await refetch?.();
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    } finally {
      setNewItemText("");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      setTogglingId(id);
      await editMutate({});
      toast.success("Edytowanu!");
      await refetch?.();
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setRemovingId(id);
      await removeMutate({});
      toast.success("Usunięto!");
      await refetch?.();
    } catch (error) {
      let message = error instanceof Error ? error.message : "Błąd zapisu";
      console.log(message);
      toast.error(message);
    } finally {
      setRemovingId(null);
    }
  };

  const restCount = checkListItems.filter((item) => !item.completed).length;
  const totalCount = checkListItems.length;
  const width = `${(restCount / totalCount) * 100}`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Moja Checklista
            </h1>
            <p className="text-gray-600">
              Zostało: {restCount} z {totalCount}
            </p>
            {restCount > 0 && (
              <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-300"
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>
            )}
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
              onClick={handleAdd}
              disabled={!newItemText.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Dodaj
            </button>
          </div>

          <div className="space-y-2">
            {checkListItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Brak zadań. Dodaj pierwsze!
              </div>
            ) : (
              checkListItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="flex-shrink-0"
                  >
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        item.completed
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 hover:border-green-400"
                      }`}
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
                  </button>

                  <span
                    className={`flex-1 ${
                      item.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {item.text}
                  </span>

                  <button
                    onClick={() => handleDelete(item.id)}
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCheckList;
