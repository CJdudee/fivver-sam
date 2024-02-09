'use server'

import Packages from "@/models/Packages"
import { simpleJson } from "@/utils/helpers"


export const getPack = async (packageId: string) => {

    const foundPack = await Packages.findById(packageId)

    if(!foundPack) return null


    return simpleJson(foundPack)
}