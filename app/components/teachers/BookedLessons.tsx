"use client";
import { cancelBooking } from "@/actions/teacherBooking";
import { toDate } from "date-fns";
import React from "react";

export default function BookedLessons({ booked }: any) {

  const onCancelBook = async (bookingId : string) => {
    await cancelBooking(bookingId)
  }

  return (
    <div className=" flex flex-col gap-8">
      {booked.map((b: any) => {
        const time = new Date(b.date);
        // const formatted = b.date.toISOString()
        const formatted = time.getMonth();
        const formattedDay = time.getDate();
        const formattedYear = time.getFullYear();

        console.log(formatted, formattedDay, "yo yo what");

        return (
          <div
            key={b._id}
            className="justify-center flex flex-col items-center text-white text-2xl bg-slate-600 rounded  my-4 p-4 w-2/3 mx-auto  "
          >
            {/* <p>{b.date}</p> */}
            <div className="flex justify-evenly w-full">
              <p>
                {formatted + 1}/{formattedDay}/{formattedYear}
              </p>
              <p>Time: {b.time}</p>
            </div>
            <div className="text-center w-full">
              <p>Student:</p>
              <div className="flex flex-col items-center justify-evenly w-1/2 mx-auto outline outline-1 rounded-xl">
                <div className="flex w-full">
                  <p className="w-1/2 text-center bg-blue-400 rounded-tl-xl">Name</p>
                  <p className="w-1/2 text-center bg-blue-400 rounded-tr-xl">{b.student.username}</p>
                </div>
                <div className="flex w-full">
                  <p className="w-1/2 text-center bg-blue-400 ">Email</p>
                  <p className="w-1/2 text-center bg-blue-400 ">{b.student.email != "" ? b.student.email : "No Email "}</p>
                </div>
                
              </div>
              <div>
                {b.status && <p>{b.status}</p>}
                </div>
            </div>
            <div className="flex w-full justify-evenly mt-4">
              <button>Accept</button>
              <button onClick={() => {
                onCancelBook(b._id)
              }}>Cancel</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
