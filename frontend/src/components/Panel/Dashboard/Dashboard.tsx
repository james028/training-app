import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      Dashboard
      <br />
      <button onClick={() => navigate(`/trainings-test`)}>
        Treningi testowe
      </button>
      <br />
      <button onClick={() => navigate(`/trainings`)}>Treningi</button>
      <br />
    </div>
  );
};

export default Dashboard;
