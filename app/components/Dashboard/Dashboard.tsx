import React from "react";
import MainScreen from "./MainScreen/MainScreen";
import TopBar from "./TopBar/TopBar";

function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-gray-100 md:pl-[20px]">
      <TopBar />
      <MainScreen />
    </div>
  );
}

export default Dashboard;