import { capitalize, gerFormat } from '@/utils/helpers';
import { formatDate } from 'date-fns';
import { Bebas_Neue } from 'next/font/google';
import React from 'react'


const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function AllBooking({booked, bookingLength, onCancelBook} : any) {
  return (
    <>
    <p className={` ${bebas.className} text-center text-white text-3xl font-semibold`}>
        Total bookings: {bookingLength}
      </p>
      {booked.map((b: any) => {
        const time = new Date(b.date);
        
        const isDayOver = time < new Date()

        const formated = gerFormat(time);

        const split = b.time.split(":")

        const sHour = split[0]
        const sMin = split[1]

        let numb = null

        if(Number(sHour) > 12) {
          numb = sHour % 12
        }

        console.log(b.status)
        // console.log(split)

        // console.log(b.time)
        // console.log(formatted, formattedDay, "yo yo what");

        return (
          <div
          key={b._id}
          className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full md:w-4/5 mx-auto">
          <div className="flex items-center justify-center gap-8 mb-4 w-full px-2 md:px-0 md:w-1/2 mx-auto">
            <h3 className="text-xl font-bold">{formated}</h3>
            <p className="text-xl font-bold">{split[0]}:{split[1]} </p>
          </div>
          <div className="border-b border-gray-200 py-4">
            <div className="flex justify-center gap-8 items-center">
              <p className="text-lg font-medium">Student:</p>
              <p className="text-lg font-medium">{capitalize(b.student.firstName)}</p>
            </div>
            <div className="flex justify-center gap-8 items-center">
              <p className="text-lg font-medium">Email:</p>
              <p className="text-lg font-medium truncate">{b.student.email || 'No Email'}</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-full mt-4">
            <p className="text-lg font-medium">Status:</p>
            <p className={`ml-2 text-black font-bold ${isDayOver && b.status === 'pending' ? 'text-gray-600' : ''}`}>
              {isDayOver && b.status === 'pending' && 'Completed'}
              {isDayOver && b.status === 'canceled' && 'Canceled'}
              {!isDayOver && capitalize(b.status || 'Completed')}
            </p>
          </div>
          
        </div>
        );
      })}
    </>

  )
}



// const formatted = b.date.toISOString()
// const formatted = time.getMonth();
// const formattedDay = time.getDate();
// const formattedYear = time.getFullYear();
// const formattedHour = time.getHours()
// const formattedMin = time.getMinutes()

// const numb = timeConvert()

// <div className="flex justify-center mt-4">
//             <button
//               className={`btn btn-primary ${isDayOver ? 'disabled:opacity-50' : ''}`}
//               onClick={() => onCancelBook(b._id)}
//               disabled={isDayOver}
//             >
//               Cancel
//             </button>
//           </div>