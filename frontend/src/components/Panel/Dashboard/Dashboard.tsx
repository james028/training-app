import React from "react";
import Calendar from "../../Calendar/Calendar";
import SimpleCheckList from "../../SimpleCheckList/SimpleCheckList";
import ActivityTypePage from "../../TrainingsType/ActivityTypePage";
import PlankSection from "../../PlankSection/PlankSection";

const Dashboard = () => {
  return (
    <div>
      <PlankSection />
      <Calendar />
      <ActivityTypePage />
      <SimpleCheckList />
    </div>
  );
};

export default Dashboard;
