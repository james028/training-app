import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Panel/Navbar/Navbar";
import PlankSection from "./PlankSection/PlankSection";

const Home = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/*<header style={{ padding: "1rem", background: "#eee" }}>*/}
      {/*  <nav>*/}
      {/*    <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}*/}
      {/*    <Link to="/register">Register</Link> |{" "}*/}
      {/*    <Link to="/dashboard">Dashboard</Link> |{" "}*/}
      {/*    <Link to="/trainings-test">Tr test</Link> |{" "}*/}
      {/*    <Link to="/trainings">Tr</Link> |{" "}*/}
      {/*  </nav>*/}
      {/*</header>*/}
      <Navbar />

      <main style={{ padding: "1rem", flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{ padding: "1rem", background: "#eee" }}>
        &copy; 2025 My App
      </footer>
    </div>
  );
};

export default Home;
