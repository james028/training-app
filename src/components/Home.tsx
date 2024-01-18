import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
          Home

        <button onClick={() => navigate(`/trainings`)}> Treningi</button>
        </div>
    );
};

export default Home;