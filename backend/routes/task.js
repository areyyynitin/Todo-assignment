import express from "express"
import { createTask , getAllTask,updateTask,deleteTask } from "../controllers/TaskController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router  = express.Router()

router.post("/" ,authMiddleware , createTask)
router.get("/"  ,authMiddleware, getAllTask)
router.put("/:id" , authMiddleware , updateTask)
router.delete("/:id" , authMiddleware , deleteTask)

export default router;

