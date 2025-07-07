import ActionLog from "../models/ActionLogs.js";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    console.log("🟢 Incoming Task Data:", req.body);

    const { title, description, priority, assignedTo } = req.body;

    // Create the task
    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
    });

    // Log the creation action
    await ActionLog.create({
      user: req.user.id,
      task: task._id,
      action: "Created",
    });

    // Populate the task with user data
    const populatedTask = await Task.findById(task._id).populate(
      "assignedTo",
      "username email"
    );

    res.status(201).json({
      message: "Task created successfully",
      task: populatedTask,
    });
  } catch (error) {
    console.error("❌ Task creation failed:", error.message);
    res.status(500).json({ message: error.message });
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
    const { id } = req.params;
    const {
      title,
      description,
      priority,
      assignedTo,
      status,
      clientUpdatedAt,
    } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🟨 Conflict check only if it's a full edit
    if (clientUpdatedAt) {
      const serverTime = new Date(task.updatedAt).getTime();
      const clientTime = new Date(clientUpdatedAt).getTime();

      if (serverTime !== clientTime) {
        return res.status(409).json({
          message:
            "Conflict detected. Task has already been updated by another user.",
          serverTask: task,
        });
      }
    }

    // ✅ Apply updates
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;
    if (status !== undefined) task.status = status;

    await task.save();

    await ActionLog.create({
      user: req.user.id,
      task: id,
      action: clientUpdatedAt ? "Edited" : `Moved to ${status}`,
    });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({ message: "Failed to update task" });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);

    await ActionLog.create({
      user: req.user.id,
      task: id,
      action: "Deleted"
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const dragDropTask = async (req, res) => {
  try {
    const { id } = req.params; // task ID
    const { newStatus } = req.body; // "In Progress", "Done", etc.

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const oldStatus = task.status;
    if (oldStatus === newStatus) {
      return res.status(200).json({ message: "No change in task status" });
    }

    task.status = newStatus;
    await task.save();

    await ActionLog.create({
      user: req.user.id,
      task: task._id,
      action: "Drag-Drop",
      details: `Moved task from ${oldStatus} to ${newStatus}`
    });

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    console.error("Drag-Drop Error:", error.message);
    res.status(500).json({ message: "Failed to update task status" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "username email");
    res.json(tasks);
  } catch (error) {
    console.error("❌ Failed to fetch tasks:", error.message);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


