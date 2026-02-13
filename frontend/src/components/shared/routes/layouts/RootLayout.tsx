import Navbar from "../../../Panel/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

const PublicLayout = () => {
  return (
    <>
      <Navbar />1
      <Outlet />
      <footer style={{ padding: "1rem", background: "#eee" }}>
        &copy; 2025 My App footer 1
      </footer>
    </>
  );
};

export default PublicLayout;
