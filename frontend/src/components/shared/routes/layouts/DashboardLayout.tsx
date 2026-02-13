// layouts/DashboardLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../appContext/appContext";

export const DashboardLayout = () => {
  const { auth } = useAppContext();
  const token = auth?.data?.accessToken ?? null;
  const navigate = useNavigate();

  const handleLogout = () => {
    //logout();
    navigate("/login");
  };

  return (
    <>
      {/*<Navbar />4*/}
      {/*<div className="flex h-screen bg-gray-100">*/}
      {/* Sidebar */}
      {/*<aside className="w-64 bg-white border-r border-gray-200">*/}
      {/*  /!* Logo *!/*/}
      {/*  <div className="h-16 flex items-center px-6 border-b border-gray-200">*/}
      {/*    <h1 className="text-xl font-bold text-gray-800">Training App</h1>*/}
      {/*  </div>*/}

      {/*  /!* User info *!/*/}
      {/*  <div className="p-4 border-b border-gray-200">*/}
      {/*    <p className="font-medium text-gray-800">{auth?.username}</p>*/}
      {/*    <p className="text-sm text-gray-500">{auth?.email}</p>*/}
      {/*  </div>*/}

      {/*  /!* Navigation *!/*/}
      {/*  <nav className="p-4 space-y-1">*/}
      {/*    <NavLink*/}
      {/*      to="/dashboard"*/}
      {/*      className={({ isActive }) =>*/}
      {/*        `block px-4 py-2 rounded-lg transition-colors ${*/}
      {/*          isActive*/}
      {/*            ? "bg-blue-50 text-blue-600 font-medium"*/}
      {/*            : "text-gray-700 hover:bg-gray-50"*/}
      {/*        }`*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Dashboard*/}
      {/*    </NavLink>*/}
      {/*    <NavLink*/}
      {/*      to="/calendar"*/}
      {/*      className={({ isActive }) =>*/}
      {/*        `block px-4 py-2 rounded-lg transition-colors ${*/}
      {/*          isActive*/}
      {/*            ? "bg-blue-50 text-blue-600 font-medium"*/}
      {/*            : "text-gray-700 hover:bg-gray-50"*/}
      {/*        }`*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Calendar*/}
      {/*    </NavLink>*/}
      {/*    <NavLink*/}
      {/*      to="/workouts"*/}
      {/*      className={({ isActive }) =>*/}
      {/*        `block px-4 py-2 rounded-lg transition-colors ${*/}
      {/*          isActive*/}
      {/*            ? "bg-blue-50 text-blue-600 font-medium"*/}
      {/*            : "text-gray-700 hover:bg-gray-50"*/}
      {/*        }`*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Workouts*/}
      {/*    </NavLink>*/}
      {/*    <NavLink*/}
      {/*      to="/stats"*/}
      {/*      className={({ isActive }) =>*/}
      {/*        `block px-4 py-2 rounded-lg transition-colors ${*/}
      {/*          isActive*/}
      {/*            ? "bg-blue-50 text-blue-600 font-medium"*/}
      {/*            : "text-gray-700 hover:bg-gray-50"*/}
      {/*        }`*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Stats*/}
      {/*    </NavLink>*/}
      {/*    <NavLink*/}
      {/*      to="/profile"*/}
      {/*      className={({ isActive }) =>*/}
      {/*        `block px-4 py-2 rounded-lg transition-colors ${*/}
      {/*          isActive*/}
      {/*            ? "bg-blue-50 text-blue-600 font-medium"*/}
      {/*            : "text-gray-700 hover:bg-gray-50"*/}
      {/*        }`*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Profile*/}
      {/*    </NavLink>*/}
      {/*    <NavLink*/}
      {/*      to="/settings"*/}
      {/*      className={({ isActive }) =>*/}
      {/*        `block px-4 py-2 rounded-lg transition-colors ${*/}
      {/*          isActive*/}
      {/*            ? "bg-blue-50 text-blue-600 font-medium"*/}
      {/*            : "text-gray-700 hover:bg-gray-50"*/}
      {/*        }`*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Settings*/}
      {/*    </NavLink>*/}
      {/*  </nav>*/}

      {/*  /!* Logout *!/*/}
      {/*  <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">*/}
      {/*    <button*/}
      {/*      onClick={handleLogout}*/}
      {/*      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"*/}
      {/*    >*/}
      {/*      Logout*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</aside>*/}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet /> {/* ← Tu renderują się child routes */}
        </div>
      </main>
      {/*</div>*/}
    </>
  );
};

export default DashboardLayout;
