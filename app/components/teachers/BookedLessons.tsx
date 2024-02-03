"use client";
import { cancelBooking } from "@/actions/teacherBooking";
import { capitalize, timeConvert } from "@/utils/helpers";
import { format, toDate } from "date-fns";
import React, { useState } from "react";
import AllBooking from "./AllBooking";
import UpComingBooking from "./UpComingBooking";

export default function BookedLessons({ booked }: any) {

  const [upComing, setUpComing] = useState(true)

  const onCancelBook = async (bookingId: string) => {
    const book = await cancelBooking(bookingId);

    console.log(book)
  };

  const bookingLength = booked.length;

  console.log(bookingLength);

  return (
    <div className=" flex flex-col gap-4">
      <div className="flex justify-center items-center gap-10 transition-all duration-300">
        <button onClick={() => setUpComing(true)} className={`text-2xl text-white ${upComing && 'underline underline-offset-4'}`}>UpComing Bookings</button>
        <button onClick={() => setUpComing(false)} className={`text-2xl text-white ${!upComing && 'underline underline-offset-4'}`}>All Bookings</button>
      </div>
      {upComing == false && <AllBooking bookingLength={bookingLength} booked={booked} onCancelBook={onCancelBook} />}
      {upComing == true && <UpComingBooking booked={booked} onCancelBook={onCancelBook} />}
    </div>
  );
}
