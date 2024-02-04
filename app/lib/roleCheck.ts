import { redirect } from "next/navigation"

export const roleChecker = (user: any, allowed: string) => {

    if(!user || !user.roles.includes(allowed)) redirect('/')

    return 
}