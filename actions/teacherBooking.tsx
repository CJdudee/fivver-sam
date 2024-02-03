'use server'

import { connectingMongoose } from "@/app/lib/connectMongo"
import Booking from "@/models/Booking"
import Token from "@/models/Token"
import User from "@/models/User"

export const cancelBooking = async (bookingId: string) => {
    // await connectingMongoose()
    const foundBooking = await Booking.findOne({_id: bookingId})

    if(!foundBooking || foundBooking.status == 'canceled') return {error: 'already cancelled'}

    console.log(foundBooking)

    foundBooking.status = "canceled"

    const cancelBooking = await foundBooking.save()

    console.log(cancelBooking)
    if(!cancelBooking) return 

    const foundUser = await User.findById(cancelBooking.student)

    if(!foundUser) return {error: 'No user found'}

    const foundToken = await Token.findOne({user: foundUser._id, groupSize: foundBooking.groupSize})

    foundToken.tokens += 1

    await foundToken.save()

    return {success: 'Booking was cancelled'}
    // console.log(foundUser)
    // foundUser.tokens += 1

    // await foundUser.save()
    // const
}