import mongoose from "mongoose"
import 'dotenv/config'

export async function connectDb(){
    
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Database connected")
    } catch(err){
        throw new Error("There was an error while connecting to the database: ", err)
    }


}