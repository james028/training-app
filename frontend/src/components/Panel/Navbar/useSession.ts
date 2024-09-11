const useSession = () => {
  const storageItsSession = window.localStorage.getItem("jwt");
  const fromStorage = storageItsSession ? JSON.parse(storageItsSession) : {};

  const user: Record<string, any> =
    {
      id: fromStorage?.id,
      email: fromStorage?.email,
      username: fromStorage?.username,
    } || {};

  return [
    {
      user,
      isLoading: false,
    },
  ];
};

export default useSession;
