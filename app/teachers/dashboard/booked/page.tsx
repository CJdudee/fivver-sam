import BookedLessons from '@/app/components/teachers/BookedLessons'
import { connectingMongoose } from '@/app/lib/connectMongo'
import { serverUser } from '@/app/lib/serverAuth'
import Booking from '@/models/Booking'
import Teacher from '@/models/Teacher'
import { simpleJson } from '@/utils/helpers'
import React from 'react'

export default async function Page() {

    const user = await serverUser()
    if(!user) return (<div>
        <p>you are not supposed to be here</p>
    </div>)

      await connectingMongoose()
    const teacher = await Teacher.findOne({user: user.id})
    const booked = await Booking.find({teacher: teacher._id, status: 'pending'}).populate('student', '-password -customerId').sort({date: 1})

    console.log(booked)

  return (
    <div className='h-screen pt-4'>
        <BookedLessons booked={simpleJson(booked)} />
        {/* {booked.map((b) => <p>{b.teacher}</p>)} */}
        {/* {simpleJson(booked)} */}
    </div>
  )
}
