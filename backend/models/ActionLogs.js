import mongoose from "mongoose"
import User from "./User.js"
import Task from "./Task.js"

const ActionLogSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId , ref:User , required:true},
    task:{type:mongoose.Types.ObjectId , ref:Task , required:true},
    details: { type: String },
    action:{type:String , required:true},
    timestamp:{type:Date , default:Date.now}
})

const ActionLog = mongoose.model("ActionLog" , ActionLogSchema)
export default ActionLog;