'use server'

import { sendVerificationEmail } from "@/app/lib/mail"
import { generateVericationToken } from "@/data/tokens"
import User from "@/models/User"


export const updateUser = async (userDate: any ) => {

    const {username, email, _id } = userDate

    const foundUser = await User.findOne({_id}).exec()

    if(!foundUser) throw new Error("User was not found")

    if(foundUser.email != email) {

        const vericationToken = await generateVericationToken(email, foundUser._id)
        if(!vericationToken) return 

        // foundUser.emailVerified = null
        // foundUser.email = email

        await sendVerificationEmail(vericationToken.email, vericationToken.token)
    }

    foundUser.username = username

    await foundUser.save()
}