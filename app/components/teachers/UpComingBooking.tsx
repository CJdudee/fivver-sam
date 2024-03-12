"use client";
import {
  addDays,
  addHours,
  addMinutes,
  formatDate,
  formatDistanceStrict,
  formatDistanceToNow,
  getYear,
} from "date-fns";
import React, { useState } from "react";
import { FcCancel, FcCheckmark } from "react-icons/fc";

import { Bebas_Neue } from "next/font/google";
import { capitalize, gerFormat } from "@/utils/helpers";
import { DateTime } from "luxon";

// const UpComingBookingContainer  = style.div

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function UpComingBooking({ booked, onCancelBook }: any) {
  const [daysAway, setDaysAway] = useState<string | number>(7);

  const filtedBooked = booked.filter((b: any) => {

    if(b.status == 'canceled') return false 

    let time = new Date(b.date);
    const split = b.time.split(":");


    const addedHour = addHours(time, Number(split[0]));

    const addedMin = addMinutes(addedHour, Number(split[1]));
    
    if (!daysAway || daysAway == 0 || typeof daysAway == "string") {

     if(addedMin < new Date()) return false

      return true
    };


    console.log(time, 'time time')

    // time = DateTime.fromJSDate(time, { zone: "Europe/Berlin" })
    //   .setLocale("SJ")
    //   .startOf("day")
    //   .toJSDate();

  

    console.log(addedMin, new Date());

    // if(b.date < new Date().toISOString()) return false

    if (addedMin < new Date()) return false;

    // console.log(b.date, 'hey')

    const timeFrame = addDays(new Date(), daysAway);

    console.log(timeFrame);
    // console.log(new Date(b.date))
    if (timeFrame > new Date(b.date)) return true;

    return false;
  });

  // console.log(filtedBooked);

  return (
    <>
      
      <div
        className={`${bebas.className} filter text-center text-3xl text-white  border-t-gray-200 pt-6 flex w-full justify-center items-center mx-auto gap-2 py-4`}
      >
        <label htmlFor="daysAway">Show bookings from </label>
        <select
          id="daysAway"
          className="text-white  bg-transparent outline rounded-xl pl-3"
          value={daysAway}
          onChange={(e) => setDaysAway(Number(e.target.value))}
        >
          <option className="text-black" value="0">
            All
          </option>
          <option className="text-black" value="3">
            Next 3 days
          </option>
          <option className="text-black" value="7">
            Next 7 days
          </option>
          <option className="text-black" value="14">
            Next 14 days
          </option>
          
        </select>
      </div>
      
      <div className="flex flex-grow justify-center items-center text-4xl text-white font-bold pt-24">
        {filtedBooked.length == 0 && <p>No Bookings {daysAway == 0 ? 'in the future' : `${daysAway} from now`} </p>}
      </div>
      <div className="flex flex-col gap-6">
        {filtedBooked.map((b: any, i: number) => {

          return (
            <BookingCard  key={i} booking={b} onCancelBook={onCancelBook} />
          );
        })}
      </div>
    </>
  );
}

{/* <div
  className={`${bebas.className} text-center text-3xl text-white mt-2 border-t border-t-slate-600 pt-4 flex w-full justify-center items-center mx-auto`}
>
  <input
    className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[90px] bg-transparent text-center pl-2  mr-2 outline rounded-full"
    value={daysAway}
    onChange={(e) => {
      if (Number(e.target.value) == 0) return setDaysAway("");
      setDaysAway(Number(e.target.value));
    }}
    type="number"
  />
  <p className={`  `}>Days from now</p>
</div> */}

const BookingCard = ({ booking, onCancelBook }: any) => {
  const time = new Date(booking.date);

  const split = booking.time.split(":");
  const addedHour = addHours(time, Number(split[0]));

  const addedMin = addMinutes(addedHour, Number(split[1]));

  // const year = getYear(time);
  const formated = gerFormat(time);

  console.log(addedMin, 'woowwo')

  const distance = formatDistanceToNow(addedMin);
  const stric = formatDistanceStrict(addedMin, new Date());

  const sHour = split[0];
  const sMin = split[1];

  let numb = null;

  if (Number(sHour) > 12) {
    numb = sHour % 12;
  }
  

  return (
    <div className="bg-white rounded-md p-4 shadow-md w-11/12 md:w-5/6 mx-auto  ">
      {/* Information section */}
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-semibold text-black  text-center">{distance} away</p>
        <div className="flex flex-col md:flex-row justify-between items-center  border-gray-200 py-3 w-full md:w-1/2 mx-auto">
          <p className="text-lg font-medium text-black">
            Booked for: {formated}
          </p>
          <p className="text-lg font-medium text-black">
            At {sHour}:{sMin}
          </p>
        </div>
      </div>

      {/* Student section */}
      <div className="mt-2 border-t border-b rounded-xl shadow-xl drop-shadow-2xl border-gray-200 py-4 text-center ">
        <h3 className="text-xl font-bold text-black mb-2">Student:</h3>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-black">
            Username: {capitalize(booking.student.firstName)}
          </p>
          <p className="text-base text-gray-500 truncate">
            Email: {booking.student.email || "No Email"}
          </p>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-base font-medium text-black">Verified:</span>
            {booking.student.emailVerified ? (
              <FcCheckmark className="w-4 h-4 text-green-500" />
            ) : (
              <FcCancel className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
      </div>

      {/* Status & Group size */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8">
        <p className="text-lg font-medium text-black">
          Status: {capitalize(booking.status)}
        </p>
        <p className="text-lg font-medium text-black">
          Group Size: {booking.groupSize}
        </p>
      </div>
    </div>
  );
};

// {/* <div className="bg-white rounded-md p-4 shadow-md">
//   {/* Information section */}
//   <div className="flex flex-col gap-4">
//     <p className="text-2xl font-semibold text-black mb-2">
//       {stric} away
//     </p>
//     <div className="flex justify-between border-b border-gray-200 py-4">
//       <p className="text-lg font-medium text-black">Booked for: {formated}</p>
//       <p className="text-lg font-medium text-black">At {sHour}:{sMin}</p>
//     </div>
//   </div>

//   {/* Student section */}
//   <div className="mt-6 border-t border-gray-200 py-4">
//     <h3 className="text-xl font-bold text-black mb-2">Student:</h3>
//     <div className="flex flex-col gap-2">
//       <p className="text-base font-medium text-black">Username: {capitalize(b.student.username)}</p>
//       <p className="text-base text-gray-500 truncate">Email: {b.student.email || "No Email"}</p>
//       <div className="flex items-center gap-2">
//         <span className="text-base font-medium text-black">Verified:</span>
//         {b.student.emailVerified ? (
//           <FcCheckmark className="w-4 h-4 text-green-500" />
//         ) : (
//           <FcCancel className="w-4 h-4 text-red-500" />
//         )}
//       </div>
//     </div>
//   </div>

//   {/* Status & Group size */}
//   <div className="flex justify-between mt-6">
//     <p className="text-lg font-medium text-black">Status: {capitalize(b.status)}</p>
//     <p className="text-lg font-medium text-black">Group Size: {b.groupSize}</p>
//   </div>

//   {/* Button */}
//   <button
//     className="btn btn-primary mt-4"
//     onClick={() => onCancelBook(b._id)}
//   >
//     Cancel
//   </button>
// </div> */}



// {/* <div
//               key={b._id}
//               className="flex flex-col items-center justify-center gap-4 bg-gray-200 w-full  md:w-5/6 lg:2/3 md:mx-auto py-8  px-6 rounded-xl relative"
//             >
//               <p className=" text-2xl md:text-3xl  font-extrabold mb-4 absolute top-2 left-4 underline-offset-2 underline">
//                 {stric} away
//               </p>

//               <div className="text-center w-full mt-2 md:mt-4 ">
//                 <div className="md:flex gap-10 text-black text-center w-full justify-evenly  border-b-white border-b-2 py-8 font-extrabold rounded-xl mb-2 ">
//                   <div className="flex justify-evenly gap-8 w-full">
//                     <p className="md:text-3xl">Booked for: </p>
//                     <p className="md:text-3xl">{formated}</p>
//                     <p className="md:text-3xl">
//                       At {sHour} : {sMin}
//                       {/* {numb ? "pm" : "am"} */}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full">
//                 <p className="text-center text-3xl font-bold mb-2 rounded-xl border-b-4 border-r-2 border-l-2 w-fit mx-auto px-2 bg-gray-700 text-white">
//                   Student:
//                 </p>
//                 <div className="md:text-3xl md:flex flex-col gap-4 text-center text-black w-full justify-evenly border-b-2 py-6 font-extrabold border-t-2 rounded-2xl drop-shadow-2xl shadow-xl">
//                   <div className="flex gap-4 justify-center relative ">
//                     <p>Username:</p>
//                     <p>{capitalize(b.student.username)}</p>
//                     <p className=" absolute -top-4 text-xs flex">
//                       Verified
//                       {b.student.emailVerified ? (
//                         <FcCheckmark className="w-6 h-6 pb-1.5 text-green-300 " />
//                       ) : (
//                         <FcCancel className="w-4 h-4 pb-1.5" />
//                       )}
//                     </p>
//                   </div>
//                   <div className=" relative ">
//                     <p className="truncate"> {b.student.email}</p>
//                     {!b.student.email && <p className="truncate">No Email</p>}
//                     {/* <p className=" absolute  md:-top-2 md:-right-10 text-xs flex">
//                       Verified
//                       {b.student.emailVerified ? (
//                         <FcCheckmark className="w-6 h-6 pb-1.5 text-green-300 " />
//                       ) : (
//                         <FcCancel className="w-4 h-4 pb-1.5" />
//                       )}
//                     </p> */}
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={` md:flex text-center justify-evenly w-full font-extrabold`}
//               >
//                 <p className=" text-xl md:text-3xl text-black">
//                   Status: {capitalize(b.status)}
//                 </p>
//                 <p className="text-xl md:text-3xl text-black">
//                   Group Size: {b.groupSize}
//                 </p>
//               </div>
//               {/* <div className="text-black text-end w-full font-semibold">
//               <button
//                 onClick={() => onCancelBook(b._id)}
//                 className="hover:text-red-400"
//               >
//                 Cancel
//               </button>
//             </div> */}
//             </div> */}


{/* <div className="flex items-center justify-center mt-2 border-t border-t-slate-600 pt-4 w-full text-2xl">
        <label htmlFor="daysAway">Days from now:</label>
        <input
          id="daysAway"
          className="w-24 px-2 rounded-full appearance-none outline-none border"
          type="number"
          placeholder="Enter number of days"
          value={daysAway}
          onChange={(e) => {
            if (Number(e.target.value) == 0) return setDaysAway("");
            setDaysAway(Number(e.target.value));
          }}
        />
      </div> */}