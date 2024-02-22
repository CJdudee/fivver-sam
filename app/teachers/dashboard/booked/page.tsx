import BookedLessons from '@/app/components/teachers/BookedLessons'
import { connectingMongoose } from '@/app/lib/connectMongo'
import { decodeUserAndCheckTeacher } from '@/app/lib/finallyRoleCheck'
import { roleChecker } from '@/app/lib/roleCheck'
import { serverUser } from '@/app/lib/serverAuth'
import Booking from '@/models/Booking'
import Teacher from '@/models/Teacher'
import { simpleJson } from '@/utils/helpers'
import React from 'react'

export default async function Page() {

    const user: any = await serverUser()

    // roleChecker(user, 'teacher')

    await decodeUserAndCheckTeacher()


    // console.log(user)
    if(!user || !user.roles.includes('teacher')) return (<div>
        <p>you are not supposed to be here</p>
    </div>)

      await connectingMongoose()
    const teacher = await Teacher.findOne({user: user.id})
    const booked = await Booking.find({teacher: teacher._id, status: 'pending',}).populate('student', '-password -customerId').sort({date: 1})

    // console.log(booked)

  return (
    <div className='h-full min-h-screen  pb-4'>
        <BookedLessons booked={simpleJson(booked)} />
        {/* {booked.map((b) => <p>{b.teacher}</p>)} */}
        {/* {simpleJson(booked)} */}
    </div>
  )
}
