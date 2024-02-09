"use client";

import { cancelBooking, userCancelBooking } from "@/actions/teacherBooking";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize } from "@/utils/helpers";
import {
  addDays,
  addHours,
  addMinutes,
  format,
  formatDate,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import React, { useState } from "react";

export default function UserBookedLessons({ booked }: any) {
  const [statusFilter, setStatusFilter] = useState("pending");

  const [bookingArray, setBookingArray ] = useState(booked ?? [])
  // const [statusFilter, setStatusFilter ] = useState(null)

  const onCancelBook = async (bookingId: string) => {
    const cancel = await userCancelBooking(bookingId);

    if(!cancel) return errorToast()

    if(cancel.error) return errorToast(cancel.error)

    susToast(cancel.success as string)

    console.log(cancel);

    const copy = [...bookingArray]

    const filteredCopy = copy.filter((c) => c._id != bookingId)

    setBookingArray(filteredCopy)
  };

  const filteredBook = bookingArray.filter((b: any) => {
    if (statusFilter == null) return true;

    if (b.status == statusFilter) return true;
  });

  return (
    <div className=" flex flex-col gap-8 pt-8">
      {filteredBook.map((b: any) => {
        const time = new Date(b.date);
       

        const distance = formatDistanceToNow(time);
        const distanceStric = formatDistanceToNowStrict(time);

        const timeArray = b.time.split(":");

        const formated = formatDate(time, "MM/dd/yy");

        // const fullDay = addDays(new Date(), 1) < time
        // const fullDay = addDays(time, 1)

        const addedHour = addHours(time, Number(timeArray[0]));

        const addedMin = addMinutes(addedHour, Number(timeArray[1]));

        const isFullDay = addDays(new Date(), 1) < addedMin;
        // const fullDay = addDays(new Date(), 1)

        // const addedHour = addHours(fullDay, Number(timeArray[0]))

        // const addedMin = addMinutes(addedHour, Number(timeArray[1]))


        console.log(timeArray, isFullDay, addedMin, addDays(new Date(), 1));
        // console.log(formatted, formattedDay, "yo yo what");

        return (
          <div
            key={b._id}
            className="justify-center flex flex-col items-center text-black font-bold text-2xl bg-[#c5c5c5] rounded-xl  my-4 p-4 w-full md:w-2/3 mx-auto  "
          >
            <div className="flex flex-row w-full justify-center gap-8 text-3xl mb-2">
              <p className=" text-center  rounded-tl-xl">Teacher:</p>
              <p className=" text-center  rounded-tr-xl truncate font-extrabold">
                {b.teacher.user.username}
              </p>
            </div>
            {/* <p>{b.date}</p> */}
            <div className="flex flex-col md:flex-row items-center justify-evenly w-full mb-4">
              {/* <p>{isFullDay ? 'true' : 'false'}</p> */}
              {/* <p>{ }</p> */}
              <p>{distance} from now</p>
              {/* <p>{distanceStric}</p> */}
              <p>Booked for {formated}</p>
              <p>At Time {b.time}</p>
            </div>
            <div className="text-center w-full">
              <p></p>
              <div className="flex flex-col items-center justify-evenly w-full md:w-1/2 mx-auto  rounded-xl py-2">
                <div className="flex flex-row w-full justify-center"></div>
                <div className="flex flex-col md:flex-row w-full mb-2 ">
                  <p className="w-full md:w-1/2 text-center  ">Email:</p>
                  <p className="w-full md:w-1/2 text-center  ">
                    {b.teacher.user.email != ""
                      ? b.teacher.user.email
                      : "No Email "}
                  </p>
                </div>
                {b.groupSize && (
                  <p className="text-center w-full">
                    Group Size: {b.groupSize}
                  </p>
                )}
              </div>
              <div></div>
            </div>
            <div className="flex w-full justify-evenly mt-4">
              {/* <button>Accept</button> */}
              {b.status == "pending" && (
                <button
                className="outline outline-1 hover:outline-4 hover:outline-red-800 transition-all duration-300 px-8 rounded-full"
                  onClick={() => {
                    onCancelBook(b._id);
                  }}
                  disabled={!isFullDay}
                >
                  Cancel
                </button>
              )}
            </div>
            {b.status && (
              <p className="text-start w-full">{b.status == 'pending' && 'Awaiting'}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
