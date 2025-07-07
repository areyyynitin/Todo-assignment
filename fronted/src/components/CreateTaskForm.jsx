import { useState, useEffect } from "react";

const CreateTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch all users to show in dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assignedTo || assignedTo === "") {
      alert("Please select a user to assign this task to.");
      return;
    }

    const res = await fetch("http://localhost:5001/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, priority, assignedTo }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setAssignedTo("");
      onTaskCreated(); // refresh Kanban
    } else {
      const error = await res.text();
      console.error("Failed to create task:", error);
      alert("Failed to create task: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded border bg-white mb-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Create New Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="" disabled>
          -- Select User --
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username} ({user.email})
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
