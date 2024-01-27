import BookedLessons from '@/app/components/teachers/BookedLessons'
import UserBookedLessons from '@/app/components/users/UserBookedLessons'
import { connectingMongoose } from '@/app/lib/connectMongo'
import { serverUser } from '@/app/lib/serverAuth'
import Booking from '@/models/Booking'
import { simpleJson } from '@/utils/helpers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {

    const user = await serverUser()

    if(!user) redirect('/api/auth/signin')
    connectingMongoose()

    const booked = await Booking.find({student: user.id}).populate({ path: 'teacher', populate: { path: 'user'}}).exec()

    console.log(booked)

  return (
    <div>
        <UserBookedLessons booked={simpleJson(booked)} />
    </div>
  )
}
