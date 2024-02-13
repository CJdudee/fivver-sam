import { serverUser } from '@/app/lib/serverAuth'
import Booking from '@/models/Booking'
import Teacher from '@/models/Teacher'
import { simpleJson } from '@/utils/helpers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {

    const user = await serverUser()
    if(!user) redirect('/')

    const foundTeacher = await Teacher.findOne({user: user.id})

    if(!foundTeacher) redirect('/')

    const foundBooking = await Booking.find({teacher: foundTeacher._id, date: {$lt: new Date()}})

    console.log(foundBooking)

    const oldBooking = simpleJson(foundBooking)

  return (
    <div className='h-[92vh] min-h-[900px]'>
        {oldBooking.length == 0 && <div className='text-center text-white text-2xl'>
            <p>No Old Bookings</p>
            <Link className='underline' href={'/teachers/dashboard'}>Go Back to Dashboard</Link>
            </div>}
    </div>
  )
}
