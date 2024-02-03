import { capitalize } from '@/utils/helpers';
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
        const formatted = time.getMonth();
        const formattedDay = time.getDate();
        const formattedYear = time.getFullYear();
        const formattedHour = time.getHours()
        const formattedMin = time.getMinutes()

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
            className="justify-center flex flex-col items-center text-black font-semibold text-2xl bg-[#c5c5c5] rounded-xl drop-shadow-lg shadow-md shadow-white  my-4 p-4 w-full md:w-2/3 mx-auto  "
          >
            {/* <p>{b.date}</p> */}
            <div className="flex justify-evenly w-full">
              <p>
                Date: {formatted + 1}/{formattedDay}/{formattedYear}
              </p>
              <p>Time: {numb ?? b.time } : {sMin} {numb ? 'pm' : 'am'}</p>
            </div>
            <div className="text-center w-full">
              <div className="flex flex-col items-center justify-evenly w-full mx-auto outline outline-1 rounded-xl p-4  gap-2 mt-4">
                <p>Student:</p>
                <div className="md:flex w-full text-center truncate ">
                  <p className="md:w-1/2 text-center  rounded-tl-xl">Name</p>
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
                {b.status && <p className="text-gray-600 font-bold">{b.status}</p>}
              </div>
            </div>
            <div className="flex w-full justify-evenly mt-4">
              <button className="bg-[#f5f5f5] px-2 md:px-8 py-0.5 rounded-full">Add To Calendar</button>
              <button className="bg-[#f5f5f5] px-2 md:px-8 py-0.5 rounded-full"
                onClick={() => {
                  onCancelBook(b._id);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </>

  )
}
