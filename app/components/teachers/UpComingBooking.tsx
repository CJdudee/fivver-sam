"use client";
import { addDays, formatDate, formatDistanceToNow, getYear } from "date-fns";
import React from "react";
import { FcCancel, FcCheckmark } from "react-icons/fc";

export default function UpComingBooking({ booked, onCancelBook }: any) {
  const filtedBooked = booked.filter((b: any) => {
    const timeFrame = addDays(new Date(), 20);

    console.log(timeFrame);
    // console.log(new Date(b.date))
    if (timeFrame > new Date(b.date)) return true;

    return false;
  });

  console.log(filtedBooked);

  return (
    <>
      <p className="text-center text-3xl text-white mt-2 border-t border-t-slate-600">
        7 Days from now
      </p>
      {filtedBooked.map((b: any) => {
        const time = new Date(b.date);
        // const formatted = b.date.toISOString()
        // const formatted = time.getMonth();
        // const formattedDay = time.getDate();
        // const formattedYear = time.getFullYear();
        // const formattedHour = time.getHours();
        // const formattedMin = time.getMinutes();

        // const year = getYear(time);
        const formated = formatDate(time, "MM/dd/yy");

        const distance = formatDistanceToNow(time);

        // const numb = timeConvert()

        const split = b.time.split(":");

        const sHour = split[0];
        const sMin = split[1];

        let numb = null;

        if (Number(sHour) > 12) {
          numb = sHour % 12;
        }

        console.log(split);

        console.log(b.time);

        return (
          <div key={b._id} className="flex flex-col items-center justify-center gap-6 bg-slate-950 w-fit mx-auto p-2 px-6 rounded-xl ">
            <div className="md:flex gap-10 text-white text-center ">
              <p className="text-3xl">{distance} away</p>
              <p className="text-3xl">Booked for: {formated}</p>

              <p className="text-3xl">
                {numb ?? sHour} : {sMin} {numb ? "pm" : "am"}
              </p>
            </div>

            <div className="text-2xl md:flex gap-8 text-center text-white">
              <p>Student: {b.student.username}</p>
              <div className=" relative">
                <p> {b.student.email}</p>
                <p className=" absolute  md:-top-2 -right-10 text-xs flex">
                  Verified
                  {b.student.emailVerified ? (
                    <FcCheckmark className="w-4 h-4 pb-1.5 text-green-300 " />
                  ) : (
                    <FcCancel className="w-4 h-4 pb-1.5" />
                  )}
                </p>
              </div>
            </div>
            <p className="text-3xl text-white">Status: {b.status}</p>
            <p className="text-3xl text-white">Group Size: {b.groupSize}</p>

            <div className="text-white text-end w-full">
                <button onClick={() => onCancelBook(b._id)} className="hover:text-red-400">Cancel</button>
            </div>
          </div>
        );
      })}
    </>
  );
}
