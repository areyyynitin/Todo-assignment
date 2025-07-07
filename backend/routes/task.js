import express from "express"
import { createTask , getAllTask,updateTask,deleteTask,dragDropTask,getAllTasks } from "../controllers/TaskController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router  = express.Router()

router.post("/" ,authMiddleware , createTask)
router.get("/"  ,authMiddleware, getAllTask)
router.put("/:id" , authMiddleware , updateTask)
router.put("/drag-drop/:id", authMiddleware, dragDropTask);
router.delete("/:id" , authMiddleware , deleteTask)
router.get("/", authMiddleware, getAllTasks);


export default router;

