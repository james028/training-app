import React from "react";
import { useNavigate } from "react-router-dom";
import PlankSection from "../../PlankSection/PlankSection";

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
      <PlankSection />
    </div>
  );
};

export default Dashboard;
