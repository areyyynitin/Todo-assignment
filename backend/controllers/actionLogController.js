import ActionLog from "../models/ActionLogs.js";

export const getRecentActions  = async (req,res) => {
try {
     const logs = await ActionLog.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .populate("user", "username email")
      .populate("task", "title");

      res.json({action:logs})
} catch (error) {
    res.status(500).json({message:"Failed to fetch action logs"})
}
}