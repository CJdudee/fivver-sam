'use server'

import { sendVerificationEmail } from "@/app/lib/mail"
import { generateVericationToken } from "@/data/tokens"
import User from "@/models/User"


export const updateUser = async (userDate: any ) => {

    const {firstName, lastName, email, _id } = userDate

    const foundUser = await User.findOne({_id}).exec()

    if(!foundUser) throw new Error("User was not found")

    if(foundUser.email != email) {

        const isTaken = await User.findOne({email}).exec()

        if(isTaken) return {error: 'Email is already taken'}

        const vericationToken = await generateVericationToken(email, foundUser._id)
        if(!vericationToken) return 

        // foundUser.emailVerified = null
        // foundUser.email = email

        await sendVerificationEmail(vericationToken.email, vericationToken.token)
    }

    // foundUser.username = username
    foundUser.firstName = firstName
    foundUser.lastName = lastName

    const saved = await foundUser.save()

    if(!saved) return null

    return {msg: `${firstName} has been updated`}
}