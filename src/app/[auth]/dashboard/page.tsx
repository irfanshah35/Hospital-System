import React from "react";
import DashboardClient from "./dashboardClient";

const Dashboard = async ({ params }: { params: Promise<{ auth: string }> }) => {
  const param = await params;

  return (
    <div>
      <DashboardClient authParam={param.auth} />
    </div>
  );
};

export default Dashboard;
