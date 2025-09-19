import mongoose from "mongoose";

export async function dbconnection() {
    try{
        mongoose.connect(process.env.MONGO_DB)
                .then(console.log("MongoDB is Connected"))
                .catch(err => console.log(err))
    }catch(error){
        return error;
    }
}