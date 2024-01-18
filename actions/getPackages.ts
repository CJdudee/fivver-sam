'use server'

import Packages from "@/models/Packages"
import mongoose from "mongoose"

export const packages = async () => {
    mongoose.connect(process.env.MONGO_URI as string)
    return await Packages.find().exec()
}