'use server'
import { signOut } from "@/auth"

// import { signOut } from "next-auth/react"

export const signOutUser = async () => {
    return await signOut()
}