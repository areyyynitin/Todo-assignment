import { useEffect, useState } from "react";
import TaskCard from "./TasksCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/KanbanBoard.css"

const columns = ["Todo", "In Progress", "Done"];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("❌ Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId;

    try {
      await fetch(`http://localhost:5001/api/tasks/${draggableId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchTasks();
    } catch (error) {
      console.error("❌ Failed to update task:", error);
    }
  };

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="column"
              >
                <h2>{status}</h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-wrapper"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
