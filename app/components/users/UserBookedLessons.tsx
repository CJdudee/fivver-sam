'use client'

import { cancelBooking, userCancelBooking } from '@/actions/teacherBooking';
import { capitalize } from '@/utils/helpers';
import { addDays, addHours, addMinutes, format, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import React, { useState } from 'react'

export default function UserBookedLessons({booked}: any) {

  const [statusFilter, setStatusFilter ] = useState('pending')
  // const [statusFilter, setStatusFilter ] = useState(null)

    const onCancelBook = async (bookingId : string) => {
      const cancel = await userCancelBooking(bookingId)

      console.log(cancel)
    }

    const filteredBook = booked.filter((b: any) => {

      if(statusFilter == null) return true

      if(b.status == statusFilter) return true

    })
  
    return (
      <div className=" flex flex-col gap-8 pt-8">
        {filteredBook.map((b: any) => {
          const time = new Date(b.date);
          // const formatted = b.date.toISOString()
          const formatted = time.getMonth();
          const formattedDay = time.getDate();
          const formattedYear = time.getFullYear();

          const distance = formatDistanceToNow(time);
          const distanceStric = formatDistanceToNowStrict(time);

          const timeArray = b.time.split(':')

          
          
          // const fullDay = addDays(new Date(), 1) < time
          // const fullDay = addDays(time, 1) 

          const addedHour = addHours(time, Number(timeArray[0]))

          const addedMin = addMinutes(addedHour, Number(timeArray[1]))

          const isFullDay = addDays(new Date(), 1) < addedMin
          // const fullDay = addDays(new Date(), 1) 

          // const addedHour = addHours(fullDay, Number(timeArray[0]))

          // const addedMin = addMinutes(addedHour, Number(timeArray[1]))

          // const isFullDay = addedMin < time

          // const formatedKk = Number(format(addedMin, "kk:mm"))
          
          console.log(timeArray, isFullDay, addedMin, addDays(new Date(), 1))
          // console.log(formatted, formattedDay, "yo yo what");
  
          return (
            <div
              key={b._id}
              className="justify-center flex flex-col items-center text-black font-bold text-2xl bg-[#c5c5c5] rounded-xl  my-4 p-4 w-2/3 mx-auto  "
            >
              {/* <p>{b.date}</p> */}
              <div className="flex justify-evenly w-full">
                <p>{isFullDay ? 'true' : 'false'}</p>
                <p>{ }</p>
                <p>{distance}</p>
                {/* <p>{distanceStric}</p> */}
                <p>
                  {formatted + 1}/{formattedDay}/{formattedYear}
                </p>
                <p>Time: {b.time}</p>
              </div>
              <div className="text-center w-full">
                <p></p>
                <div className="flex flex-col items-center justify-evenly w-1/2 mx-auto  rounded-xl p-4">
                  <div className="flex w-full">
                    <p className="w-1/2 text-center  rounded-tl-xl">Teacher:</p>
                    <p className="w-1/2 text-center  rounded-tr-xl">{b.teacher.user.username}</p>
                  </div>
                  <div className="flex w-full">
                    <p className="w-1/2 text-center  ">Email</p>
                    <p className="w-1/2 text-center  ">{b.teacher.user.email != "" ? b.teacher.user.email : "No Email "}</p>
                  </div>
                  
                </div>
                <div>
                  
                  {b.groupSize && <p>Group Size: {b.groupSize}</p>}
                  </div>
              </div>
              <div className="flex w-full justify-evenly mt-4">
                {/* <button>Accept</button> */}
                {b.status == 'pending' && <button onClick={() => {
                  onCancelBook(b._id)
                }}
                disabled={!isFullDay}
                >Cancel</button>}
              </div>
              {b.status && <p className='text-start w-full'>{capitalize(b.status)}</p>}
            </div>
          );
        })}
      </div>
    );
  }
  