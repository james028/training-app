import React from "react";
import Calendar from "../../Calendar/Calendar";
import SimpleCheckList from "../../SimpleCheckList/SimpleCheckList";
import ActivityTypePage from "../../TrainingsType/ActivityTypePage";

const Dashboard = () => {
  return (
    <div>
      <Calendar />
      <ActivityTypePage />
      <SimpleCheckList />
    </div>
  );
};

export default Dashboard;
