import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username email"); // Return only needed fields
    res.json(users);
  } catch (error) {
    console.error("❌ Failed to fetch users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
