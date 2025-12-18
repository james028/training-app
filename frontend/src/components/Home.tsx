import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Panel/Navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1rem", flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{ padding: "1rem", background: "#eee" }}>
        &copy; 2025 My App
      </footer>
    </>
  );
};

export default RootLayout;
