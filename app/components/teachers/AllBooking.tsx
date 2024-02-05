import { capitalize } from '@/utils/helpers';
import { formatDate } from 'date-fns';
import React from 'react'

export default function AllBooking({booked, bookingLength, onCancelBook} : any) {
  return (
    <>
    <p className="text-center text-white text-3xl font-bold">
        Total bookings: {bookingLength}
      </p>
      {booked.map((b: any) => {
        const time = new Date(b.date);
        // const formatted = b.date.toISOString()
        // const formatted = time.getMonth();
        // const formattedDay = time.getDate();
        // const formattedYear = time.getFullYear();
        // const formattedHour = time.getHours()
        // const formattedMin = time.getMinutes()

        const isDayOver = time < new Date()

        const formated = formatDate(time, "MM/dd/yy");

        // const numb = timeConvert()

        const split = b.time.split(":")

        const sHour = split[0]
        const sMin = split[1]

        let numb = null

        if(Number(sHour) > 12) {
          numb = sHour % 12
        }

        console.log(split)

        console.log(b.time)
        // console.log(formatted, formattedDay, "yo yo what");

        return (
          <div
            key={b._id}
            className="justify-center flex flex-col items-center text-black  text-2xl bg-[#c5c5c5] rounded-xl drop-shadow-lg shadow-md shadow-white  my-4 p-4 w-full md:w-2/3 mx-auto font-extrabold  "
          >
            {/* <p>{b.date}</p> */}
            <div className="flex justify-evenly w-full">
              <p>
                Date: {formated}
              </p>
              <p>Time: {numb ?? b.time } : {sMin} {numb ? 'pm' : 'am'}</p>
            </div>
            <div className="text-center w-full">
              <div className="flex flex-col items-center justify-evenly w-full mx-auto rounded-xl p-4  gap-2 mt-4">
                
                <div className="md:flex w-full text-center truncate ">
                  <p className="md:w-1/2 text-center  rounded-tl-xl">Student:</p>
                  <p className="md:w-1/2 text-center  rounded-tr-xl">
                    {capitalize(b.student.username)}
                  </p>
                </div>
                <div className="md:flex w-full truncate">
                  <p className="md:w-1/2 text-center  ">Email</p>
                  <p className="md:w-1/2 text-center truncate  ">
                    {b.student.email != "" ? b.student.email : "No Email "}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <p>Status:</p>
                {b.status && !isDayOver && <p className="text-gray-600 font-bold">{capitalize(b.status)}</p>}
                {b.status == 'pending' && isDayOver && <p className="text-gray-600 font-bold">Completed</p>}
              </div>
            </div>
            <div className="flex w-full justify-evenly mt-4">
              {/* <button className="bg-[#f5f5f5] px-2 md:px-8 py-0.5 rounded-full">Add To Calendar</button> */}
              {/* <button disabled={isDayOver} className="bg-[#f5f5f5] px-2 md:px-8 py-0.5 rounded-full"
                onClick={() => {
                  onCancelBook(b._id);
                }}
              >
                Cancel
              </button> */}
            </div>
          </div>
        );
      })}
    </>

  )
}
