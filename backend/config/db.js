// mongodb+srv://np089250:trXkUKVCGjgbq09B@todo-assignment.infvmzp.mongodb.net/

import mongoose, { Schema } from "mongoose"

export const connectDB =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.error(`Restart ${error}`)
    }
}
     