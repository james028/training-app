import React from "react";
import Calendar from "../../Calendar/Calendar";
import ActivityTypePage from "../../TrainingsType/ActivityTypePage";
import SimpleCheckList from "../../SimpleCheckList/SimpleCheckList";
import { ActivityTypeTable } from "../../ActivityTable";
import { ActivityList } from "../../ActivityList";

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
      <ActivityTypeTable />
      <ActivityList />
    </div>
  );
};

export default Dashboard;
