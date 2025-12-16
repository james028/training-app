import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../appContext/appContext";
import usePostApi from "../../../hooks/api/post/useApiPost";
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage";
import PlankSection from "../../PlankSection/PlankSection";
import Calendar from "../../Calendar/Calendar";
import TrainingsType from "../../TrainingsType/TrainingsType";

type HeaderItemProps = {
  page: string | null;
  label: string;
  handleClick?: () => void;
};

const URL = "http://localhost:5001/";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const [, , removeValue] = useLocalStorage("jwt");

  //zmienić nazwę
  const { user, addUser } = useAppContext();
  const isAuth = Object.keys(user ?? {}).length > 0;

  const linkLogout = "api/auth/logout";
  const {
    responseStatus,
    //mutation
  } = usePostApi({ link: `${URL}${linkLogout}`, queryKey: ["userLogout"] });

  const handleLogOut = () => {
    console.log("click logout");
    removeValue();
    // mutation.mutateAsync({
    //   paramsObj: null,
    //   bodyData: null,
    // });
    addUser(null);
    navigate("/register");
  };

  const headerItemsLogOut: HeaderItemProps[] = [
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

  const headerItemsLogIn: HeaderItemProps[] = [
    {
      page: "/dashboard",
      label: "Dashboard",
      handleClick: () => navigate("/dashboard"),
    },
    { page: null, label: "Wyloguj się", handleClick: handleLogOut },
  ];

  const headerItems = isAuth ? headerItemsLogIn : headerItemsLogOut;

  console.log(headerItems, "headeritems", isAuth);

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
            {user?.email}
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
          <div>
            Użytkownik: {user?.email} {user?.username}
          </div>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {headerItems.map(({ page, label, handleClick }) => {
                console.log(page);
                return (
                  <li key={label}>
                    {/*<a*/}
                    {/*  href=""*/}
                    {/*  className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"*/}
                    {/*  aria-current="page"*/}
                    {/*  onClick={handleClick}*/}
                    {/*>*/}
                    {/*  {label}*/}
                    {/*</a>*/}
                    <Link to={page as string} onClick={handleClick}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Calendar />
          <TrainingsType />
          <PlankSection />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
