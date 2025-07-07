import mongoose from "mongoose";
import User from "./User.js";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    assignedTo: { type: mongoose.Types.ObjectId, ref: User },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo"
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    }
  },
  {
    timestamps: true 
  }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
