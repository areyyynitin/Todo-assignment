import KanbanBoards from "../components/KanbanBoards";
import CreateTaskForm from "../components/CreateTaskForm";
import { useState } from "react";
const Dashboard = () => {
   const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h2 style={{ padding: "20px" }}>Dashboard - Task Manager</h2>
       <CreateTaskForm onTaskCreated={() => setRefresh(!refresh)} />
      <KanbanBoards key={refresh} />
    </div>
  );
};

export default Dashboard;
