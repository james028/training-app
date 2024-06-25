import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      Home
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

export default Home;
