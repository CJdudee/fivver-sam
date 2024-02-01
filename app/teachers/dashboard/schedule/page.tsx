import TeacherSchedule from '@/app/components/teachers/TeacherSchedule'
import { serverUser } from '@/app/lib/serverAuth'
import Teacher from '@/models/Teacher'
import TeacherWeek from '@/models/TeacherWeek'
import { redirect } from 'next/navigation'
import React from 'react'
import ClosedDay from '@/models/ClosedDay'

export default async function Page() {
  const user = await serverUser()

  if(!user) return redirect('/')

  const teacher = await Teacher.findOne({ user: user.id})

  if(!teacher) return (
  <div>
    <p> 404</p>
  </div>
  )

  const weekDays = await TeacherWeek.findOne({ teacher: teacher._id})

    if(!weekDays) return (
    <div>
      <p> a very big problem</p>
    </div>
    )
  // console.log(weekDays, 'hey whatsus')

  const daysClosed = await ClosedDay.find({teacher: teacher._id })

  // console.log(daysClosed)

  return (
    <div className=' min-h-full'>
        <TeacherSchedule weekDays={JSON.parse(JSON.stringify(weekDays.weekdays))} id={JSON.parse(JSON.stringify(weekDays._id))} teacherId={JSON.parse(JSON.stringify(teacher._id))} daysClosed={JSON.parse(JSON.stringify(daysClosed))} />
    </div>
  )
}
