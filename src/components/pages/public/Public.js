import React from "react";
import Dashboard from "../../layouts/Dashboard";

export default function Pubic() {

  const notifications = ['New comment on your project', 'Server downtime scheduled for 2AM', 'New user registered!'];

  const topProjects = [
    { name: 'Project Alpha', score: 95 },
    { name: 'Project Beta', score: 90 },
    { name: 'Project Gamma', score: 85 },
  ];

  const topUsers = [
    { name: 'Luccaxx', xp: 1200 },
    { name: 'Bob', xp: 1100 },
    { name: 'Charlie', xp: 1050 },
  ];

  return (
    <>
      <Dashboard
        notifications={notifications}
        topProjects={topProjects}
        topUsers={topUsers}
      />
    </>
  )
}