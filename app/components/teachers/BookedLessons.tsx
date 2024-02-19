"use client";
import { cancelBooking } from "@/actions/teacherBooking";
import { useState } from "react";
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
    <div className=" flex flex-col gap-4 h-full px-2 md:px-0">
      <div className="flex justify-center items-center gap-4 transition-all duration-300 mt-8">
        <button onClick={() => setUpComing(true)} className={`text-2xl w-1/2 text-white ${upComing && 'underline underline-offset-4'}`}>UpComing Bookings</button>
        <button onClick={() => setUpComing(false)} className={`text-2xl w-1/2 text-white ${!upComing && 'underline underline-offset-4'}`}>All Bookings</button>
      </div>
      {upComing == false && <AllBooking bookingLength={bookingLength} booked={booked} onCancelBook={onCancelBook} />}
      {upComing == true && <UpComingBooking booked={booked} onCancelBook={onCancelBook} />}
    </div>
  );
}
