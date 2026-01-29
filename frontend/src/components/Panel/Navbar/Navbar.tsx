import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../appContext/appContext";
import usePostApi from "../../../hooks/api/post/useApiPost";
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage";
import { URL } from "../../../constants";
import toast from "react-hot-toast";
import { HeaderItemProps } from "../../../types";

const Navbar = () => {
  //const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const [, , removeValue] = useLocalStorage("jwt");

  //zmienić nazwę
  const { auth, handleChangeAuth } = useAppContext();
  const isAuth = Object.keys(auth ?? {}).length > 0;
  //const isAuth2 = auth?.data?.id;

  const linkLogout = "api/auth/logout";
  const { mutateAsync: mutateAsyncLogout } = usePostApi({
    link: `${URL}${linkLogout}`,
    queryKey: ["userLogout"],
  });

  const handleLogOut = async () => {
    try {
      await mutateAsyncLogout({});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd.";

      toast.error(errorMessage);
    } finally {
      removeValue();
      handleChangeAuth(null);
      toast.success("Wylogowano");
      navigate("/login");
    }
  };

  const headerItemsLogOut = [
    { page: "", label: "Home" },
    {
      page: "/register",
      label: "Zarejestruj się",
      handleClick: () => navigate("/register"),
    },
    {
      page: "/login",
      label: "Zaloguj się",
      handleClick: () => navigate("/login"),
    },
  ];

  const headerItemsLogIn = [
    {
      page: "/dashboard",
      label: "Dashboard",
      handleClick: () => navigate("/dashboard"),
    },
    { page: null, label: "Wyloguj się", handleClick: handleLogOut },
  ];

  const headerItems: HeaderItemProps[] = isAuth
    ? headerItemsLogIn
    : headerItemsLogOut;

  return (
    <>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <br />
          {auth?.data?.email}
          <br />
          {auth?.data?.username}
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {headerItems.map(({ page, label, handleClick }) => {
                console.log(page);
                return (
                  <li key={label}>
                    <Link to={page as string} onClick={handleClick}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
