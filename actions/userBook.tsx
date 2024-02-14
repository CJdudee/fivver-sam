'use server'
import Booking from '@/models/Booking'
import MonthlyOrder from '@/models/MonthlyOrder'
import Teacher from '@/models/Teacher'
import Token from '@/models/Token'
import User from '@/models/User'
import { simpleJson } from '@/utils/helpers'
import { formatDate } from 'date-fns'
export const bookAppt = async (date: any, teacherId: string, userId: string, groupSize: number) => {
    // console.log(date)
    // console.log(teacherId)
    // console.log(userId)
    console.log(typeof date.justDate)

    const formated = formatDate(date.justDate, 'MM/yy')
    console.log(formated)


    // MonthlyOrder.updateOne({date: formated}, {orders: })
    // return

    const foundUser = await User.findById(userId).exec()
    const foundTeacher = await Teacher.findById(teacherId).exec()

    if(!foundUser || !foundTeacher) return { error: 'No user found'}


    const foundTokens = await Token.findOne({user: userId, groupSize, expire: {$gt: new Date()}, tokens: {$gt: 0}})

    // console.log(foundTokens)
    // return 

    if(!foundTokens || foundTokens.tokens == 0) return { error: `Not enought Classes for a group size of ${groupSize}` }

    const createdBooking = await Booking.create({ student: userId, teacher: teacherId, date: date.justDate, time: date.dateTime, status: 'pending', tokenId: foundTokens._id, groupSize})

    if(!createdBooking) return null

    // if(!createdBooking) return {error: 'problem with creating booking'}

    foundTokens.tokens -= 1
    await foundTokens.save()

    foundTeacher.orders += 1

    await foundTeacher.save()

    console.log(createdBooking)


    
    let month = await MonthlyOrder.findOne({teacher: teacherId, date: formated})

    if(!month) {
        month = await MonthlyOrder.create({date: formated, teacher: teacherId})
    }

    month.orders += 1

    await month.save()

    console.log(month)

    return {data: simpleJson(createdBooking), msg: 'Appointment has been booked'}
}