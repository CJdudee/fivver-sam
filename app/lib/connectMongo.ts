import mongoose from "mongoose"


export const connectingMongoose = async () => {
    return mongoose.connect(process.env.MONGO_URI as string)
}