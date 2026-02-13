import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      {/*<Navbar />2*/}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Training App</h1>
            <p className="text-gray-600 mt-2">Track your fitness journey</p>
          </div>

          {/* Card wrapper dla login/register form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Outlet />
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            © 2025 Training App. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
