'use server'
import { auth } from "@/auth"


export const serverUser = async () => {
    
    const session = await auth()

    return session?.user
}