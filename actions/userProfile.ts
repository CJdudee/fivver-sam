'use server'

import { sendVerificationEmail } from "@/app/lib/mail"
import { generateVericationToken } from "@/data/tokens"
import User from "@/models/User"
import { capitalize } from "@/utils/helpers"
import bcrypt from 'bcrypt'


export const updateUser = async (userDate: any ) => {

    const {firstName, lastName, email, _id, password } = userDate

    const foundUser = await User.findOne({_id}).exec()

    if(!foundUser) throw new Error("User was not found")

    const lowerEmail = email.toLowerCase()

    const capFirst = capitalize(firstName)
    const capLast = capitalize(lastName)

    if(foundUser.email != lowerEmail) {

        const isTaken = await User.findOne({email}).exec()

        if(isTaken) return {error: 'Email is already taken'}

        const vericationToken = await generateVericationToken(email, foundUser._id)
        if(!vericationToken) return 

        // foundUser.emailVerified = null
        // foundUser.email = email

        await sendVerificationEmail(vericationToken.email, vericationToken.token)
    }

    if(password) {
        const hashed = await bcrypt.hash(password, 10)

        foundUser.password = hashed

    }

    // foundUser.username = username
    foundUser.firstName = capFirst
    foundUser.lastName = capLast

    const saved = await foundUser.save()

    if(!saved) return null

    return {msg: `${firstName} has been updated`}
}