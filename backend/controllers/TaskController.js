import Task from "../models/Task.js";



export const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo  } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo ,
    });

const populatedTask = await Task.findById(task._id).populate("assignedTo", "username email");

res.status(201).json({ message: "Task created successfully", task: populatedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create new task" });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "username email");
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to get task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
