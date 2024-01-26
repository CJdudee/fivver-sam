'use server'
import Booking from '@/models/Booking'
export const bookAppt = async (date: any, teacherId: string, userId: string) => {
    console.log(date)
    console.log(teacherId)
    console.log(userId)

    const createdBooking = await Booking.create({ student: userId, teacher: teacherId, date: date.justDate, time: date.dateTime, status: 'pending'})

    console.log(createdBooking)
}