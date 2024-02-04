import BookedLessons from '@/app/components/teachers/BookedLessons'
import UserBookedLessons from '@/app/components/users/UserBookedLessons'
import { connectingMongoose } from '@/app/lib/connectMongo'
import { roleChecker } from '@/app/lib/roleCheck'
import { serverUser } from '@/app/lib/serverAuth'
import Booking from '@/models/Booking'
import { simpleJson } from '@/utils/helpers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {

    const user = await serverUser()

    roleChecker(user, 'user')

    if(!user) redirect('/api/auth/signin')
    connectingMongoose()

    const booked = await Booking.find({student: user.id}).populate({ path: 'teacher', populate: { path: 'user'}}).sort({status: -1}).exec()

    console.log(booked)

  return (
    <div>
        <UserBookedLessons booked={simpleJson(booked)} />
    </div>
  )
}
