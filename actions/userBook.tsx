'use server'
import Booking from '@/models/Booking'
import Token from '@/models/Token'
import User from '@/models/User'
import { simpleJson } from '@/utils/helpers'
export const bookAppt = async (date: any, teacherId: string, userId: string, groupSize: number) => {
    // console.log(date)
    // console.log(teacherId)
    // console.log(userId)

    const foundUser = await User.findById(userId).exec()

    if(!foundUser) return { error: 'No user found'}

    const foundTokens = await Token.findOne({user: userId, groupSize})

    if(!foundTokens || foundTokens.tokens == 0) return { error: `Not enought Classes for a group size of ${groupSize}` }

    const createdBooking = await Booking.create({ student: userId, teacher: teacherId, date: date.justDate, time: date.dateTime, status: 'pending', tokenId: foundTokens._id, groupSize})

    if(!createdBooking) return null
    // if(!createdBooking) return {error: 'problem with creating booking'}

    foundTokens.tokens -= 1
    await foundTokens.save()

    console.log(createdBooking)

    return {data: simpleJson(createdBooking), msg: 'Appointment has been booked'}
}