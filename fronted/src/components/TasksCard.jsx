const TaskCard = ({ task }) => {
  return (
    <div
      className="task-card"
      style={{
        background: "#fff",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "8px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{task.title}</h4>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Priority: {task.priority}
      </p>
    </div>
  );
};

export default TaskCard;
