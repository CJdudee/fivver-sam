"use client";

import { cancelBooking, userCancelBooking } from "@/actions/teacherBooking";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize, gerFormat } from "@/utils/helpers";
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
  const [statusFilter, setStatusFilter] = useState();

  const [daysAway, setDaysAway ] = useState<number | undefined>(undefined)

  const [bookingArray, setBookingArray] = useState(booked ?? []);
  // const [statusFilter, setStatusFilter ] = useState(null)

  const onCancelBook = async (bookingId: string) => {
    const cancel = await userCancelBooking(bookingId);

    if (!cancel) return errorToast();

    if (cancel.error) return errorToast(cancel.error);

    susToast(cancel.success as string);

    console.log(cancel);

    const copy = [...bookingArray];

    const filteredCopy = copy.filter((c) => c._id != bookingId);

    setBookingArray(filteredCopy);
    // window.location.reload()
  };

  const filteredBook = bookingArray.filter((b: any) => {
    // if (statusFilter == null) return true;

    if(statusFilter != null) {

      if (b.status == statusFilter) return true;
    }

    if(daysAway != 0 && daysAway != undefined) {

      const time = new Date(b.date);

      const split = b.time.split(":");

      const addedHour = addHours(time, Number(split[0]));
  
      const addedMin = addMinutes(addedHour, Number(split[1]));

      const timeFrame = addDays(new Date(), daysAway);

      if (timeFrame < addedMin) return false;
      // if(b.date < new Date().toISOString()) return false
    }





    return true;
  });

  const handleChangeTimeFrame = (e: React.ChangeEvent<HTMLInputElement>) => {

    const number = Number(e.target.value)
    if(number == 0) return setDaysAway(undefined)



    setDaysAway(number)
  }


  return (
    <>
      <div className=" sticky top-12 md:top-14 py-2 px-2 z-30 bg-gray-700 rounded-xl ">
        <div className="flex flex-col gap-2 items-center justify-center">

        <label className="text-2xl font-bold text-white" htmlFor="daysAway">Set TimeFrame</label>
        <input className="text-center bg-[#eeeeee94] rounded-full font-bold" id="daysAway" value={daysAway} onChange={(e) => handleChangeTimeFrame(e)} type="number" />
        </div>
      </div>
      <div className=" flex flex-col lg:grid grid-cols-2 gap-8 pt-8 px-2">
        {filteredBook.map((b: any) => {
          const time = new Date(b.date);

          const distance = formatDistanceToNow(time);
          const distanceStric = formatDistanceToNowStrict(time);

          const timeArray = b.time.split(":");

          const formated = gerFormat(time);

          // const fullDay = addDays(new Date(), 1) < time
          // const fullDay = addDays(time, 1)

          const addedHour = addHours(time, Number(timeArray[0]));

          const addedMin = addMinutes(addedHour, Number(timeArray[1]));

          const isFullDay = addDays(new Date(), 1) < addedMin;
          // const fullDay = addDays(new Date(), 1)

          // const addedHour = addHours(fullDay, Number(timeArray[0]))

          let numberStart = Number(timeArray[0]);

          let pm = false;

          if (numberStart > 12) {
            numberStart = numberStart % 12;
            pm = true;
          }
          if (numberStart == 12) {
            pm = true;
          }

          const result = `${numberStart}:${timeArray[1]}`;

          // const addedMin = addMinutes(addedHour, Number(timeArray[1]))

          console.log(timeArray, isFullDay, addedMin, addDays(new Date(), 1));
          // console.log(formatted, formattedDay, "yo yo what");

          return (
            <div
              key={b._id}
              className="justify-center flex flex-col items-center text-white font-bold text-2xl bg-gray-600 bg-gradient-to-tl from-gray-600 to-gray-500 drop-shadow-xl shadow-xl rounded-3xl  my-4 p-4 w-full md:w-3/4 lg:w-full mx-auto  "
            >
              <div className="flex flex-col md:flex-row w-full justify-center items-center gap-2 md:gap-8 text-3xl mb-4">
                <p className=" text-center  rounded-tl-xl font-extrabold">
                  Booked With :
                </p>
                <p className=" text-center  rounded-tr-xl truncate font-extrabold">
                  {capitalize(b.teacher.user.username)}
                </p>
              </div>
              {/* <p>{b.date}</p> */}
              <div className="flex flex-col gap-2 items-center justify-evenly w-full mb-4">
                <div className="w-full flex justify-evenly">
                  {/* <p>Date</p> */}

                  <p className="w-fit text-center">{distance} from now</p>
                  {/* <p>{distanceStric}</p> */}
                  <p className=" text-center">Booked for {formated}</p>
                </div>
                <p className="w-full md:w-1/3 text-center">
                  At Time {result} {pm ? "pm" : "am"}
                </p>
              </div>
              <div className="text-center w-full">
                <div className="flex flex-col items-center justify-evenly w-full  mx-auto  rounded-3xl border-t-2 border-b-2 py-2">
                  <p className="pb-1" >Teacher Info</p>
                  <figure className="p-[1em] rounded-[1em] bg-[#eee] m-0 w-full text-black">
                    <div className="flex flex-col md:flex-row w-full mb-2 justify-center gap-2 ">
                      <p className=" text-center  ">Email:</p>
                      <p className=" text-center  ">
                        {b.teacher.user.email != ""
                          ? b.teacher.user.email
                          : "No Email "}
                      </p>
                    </div>
                  </figure>
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
              </div>
              <div className="w-full flex jsutify-between">
                {b.status && (
                  <p className="text-start w-full">
                    {b.status == "pending" && "Awaiting"}
                  </p>
                )}
                {b.status == "pending" && (
                  <button
                    className="outline outline-1 hover:outline-4 hover:outline-red-800 transition-all duration-300 px-8 rounded-full pb-1 hidden md:block"
                    onClick={() => {
                      onCancelBook(b._id);
                    }}
                    disabled={!isFullDay}
                  >
                    Cancel
                  </button>
                )}
                <p className="text-end w-full ">{distance} away</p>
              </div>
              {b.status == "pending" && (
                  <button
                    className="outline outline-1 hover:outline-4 hover:outline-red-800 transition-all duration-300 px-8 rounded-full pb-1 mt-2 md:hidden"
                    onClick={() => {
                      onCancelBook(b._id);
                    }}
                    disabled={!isFullDay}
                  >
                    Cancel
                  </button>
                )}
            </div>
          );
        })}
      </div>
    </>
  );
}
