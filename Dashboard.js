import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data));
  }, []);

  return (
    <div>
      <h1>🚦 Traffic Detection Alerts</h1>
      <table>
        <tr>
          <th>Location</th>
          <th>Timestamp</th>
          <th>Status</th>
        </tr>
        {alerts.map((alert) => (
          <tr key={alert._id}>
            <td>{alert.location}</td>
            <td>{new Date(alert.timestamp).toLocaleString()}</td>
            <td>{alert.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Dashboard;
