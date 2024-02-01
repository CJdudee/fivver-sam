'use server'

import { getUserByEmail, getUserById } from "@/app/lib/userQuery"
import { getVerificationTokenByToken } from "@/data/verificationToken"
import VerificationToken from "@/models/VerificationToken"


export const newVerification = async(token: string) => {

    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken) {
        return {error: 'Token does not exist!'}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) {
        return { error: 'Token has expired!'}
    }

    const existingUser = await getUserById(existingToken.user)

    if(!existingUser) {
        return { error: 'Email does not exist!'}
    }

    existingUser.emailVerified = new Date()

    existingUser.email = existingToken.email

    await existingUser.save()

    await VerificationToken.findByIdAndDelete(existingToken._id)


    return { success: "Email verified!"}

}