import React from "react";
import Calendar from "../../Calendar/Calendar";
import ActivityTypePage from "../../TrainingsType/ActivityTypePage";

const Dashboard = () => {
  //const navigate = useNavigate();

  return (
    <div>
      {/*Dashboard*/}
      {/*<br />*/}
      {/*<button onClick={() => navigate(`/trainings-test`)}>*/}
      {/*  Treningi testowe*/}
      {/*</button>*/}
      {/*<br />*/}
      {/*<button onClick={() => navigate(`/trainings`)}>Treningi</button>*/}
      {/*<br />*/}
      {/*<PlankSection />*/}
      <Calendar />
      <ActivityTypePage />
      {/*<SimpleCheckList />*/}
    </div>
  );
};

export default Dashboard;
