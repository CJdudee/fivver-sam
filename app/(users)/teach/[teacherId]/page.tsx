import UserBooking from '@/app/components/users/UserBooking'
import { serverUser } from '@/app/lib/serverAuth'
import Booking from '@/models/Booking'
import ClosedDay from '@/models/ClosedDay'
import Teacher from '@/models/Teacher'
import TeacherWeek from '@/models/TeacherWeek'
import { simpleJson } from '@/utils/helpers'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export default async function Page(req: NextRequest | any, res: NextResponse) {

  const user = await serverUser()
    if(!req.params) return null
    // console.log(req?.params)
    const teacherId = req.params.teacherId

    const teacher = await Teacher.findOne({_id: teacherId}).populate("user", '-password')
    const teacherWeek = await TeacherWeek.findOne({ teacher: teacherId})
    const closedDate = await ClosedDay.find({teacher: teacherId})

    const booked = await Booking.find({teacher: teacherId})

    console.log(booked)
    const {username, email} = teacher.user

    // console.log(teacherWeek)
  return (
    <div className={`bg-slate-400 px-24 text-white`}>
        <UserBooking  teacher={simpleJson(teacher)} teacherWeek={simpleJson(teacherWeek)} closedDate={simpleJson(closedDate)} user={user} booked={simpleJson(booked)} />
        {/* <p>
        {JSON.stringify(teacher)}

        </p>
        <p>{JSON.stringify(teacherWeek)}</p>
        <p>
        {JSON.stringify(closedDate)}
        </p> */}
    </div>
  )
}
