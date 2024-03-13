'use server'

import { revalidatePath } from "next/cache"

export const serverActionRev = async(path: string, type?: "layout" | "page" | undefined) => {

    revalidatePath(path, type)
}