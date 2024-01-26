'use server'

import { connectingMongoose } from "@/app/lib/connectMongo"
import Booking from "@/models/Booking"
import User from "@/models/User"

export const cancelBooking = async (bookingId: string) => {
    // await connectingMongoose()
    const foundBooking = await Booking.findOne({_id: bookingId})

    console.log(foundBooking)

    foundBooking.status = "Canceled"

    const cancelBooking = await foundBooking.save()

    console.log(cancelBooking)
    if(!cancelBooking) return 

    const foundUser = await User.findById(cancelBooking.student)

    console.log(foundUser)
    foundUser.tokens += 1

    await foundUser.save()
    // const
}