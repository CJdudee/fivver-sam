'use server'

import Packages from "@/models/Packages"
import { simpleJson } from "@/utils/helpers"
import mongoose from "mongoose"
import { revalidateTag } from "next/cache"

export const packages = async () => {
    mongoose.connect(process.env.MONGO_URI as string)
    return await Packages.find().sort({tokens: 1}).exec()
}

export const savePackage = async(packageObj: any) => {

    const {individual, name, price, priceOne, priceTwo, priceThree, tokens} = packageObj

    if(!name || !priceOne || !priceTwo || !priceThree || !tokens) return null

    const updateObj = {
        individual, 
        name, 
        priceOne,
        priceTwo,
        priceThree, 
        tokens
    }

    //update the package 
    const foundPackage = await Packages.findOneAndUpdate({_id: packageObj._id}, updateObj)

    console.log(foundPackage, ' what the fuxk')

    // revalidateTag('pack')

    return simpleJson({...updateObj, _id: packageObj._id, index: packageObj.index})
}

export const createPackage = async(packageObj: any) => {
    const createPackage = await Packages.create(packageObj)

    return simpleJson(createPackage)
}

export const deletePackage = async(packageId: string) => {
    const deleted = await Packages.findOneAndDelete({_id: packageId})

    if(!deleted) return null

    return simpleJson(deleted)
}