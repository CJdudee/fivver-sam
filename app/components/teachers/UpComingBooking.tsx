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
import React from "react";
import { FcCancel, FcCheckmark } from "react-icons/fc";

import { Bebas_Neue } from "next/font/google";
import { capitalize } from "@/utils/helpers";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function UpComingBooking({ booked, onCancelBook }: any) {
  const filtedBooked = booked.filter((b: any) => {
    const time = new Date(b.date);
    const split = b.time.split(":");

    const addedHour = addHours(time, Number(split[0]));

    const addedMin = addMinutes(addedHour, Number(split[1]));

    console.log(addedMin, new Date());

    // if(b.date < new Date().toISOString()) return false

    if (addedMin < new Date()) return false;

    // console.log(b.date, 'hey')

    const timeFrame = addDays(new Date(), 20);

    console.log(timeFrame);
    // console.log(new Date(b.date))
    if (timeFrame > new Date(b.date)) return true;

    return false;
  });

  // console.log(filtedBooked);

  return (
    <>
      <p
        className={`${bebas.className} text-center text-3xl text-white mt-2 border-t border-t-slate-600 pt-4`}
      >
        7 Days from now
      </p>
      {filtedBooked.map((b: any) => {
        const time = new Date(b.date);

        const split = b.time.split(":");
        const addedHour = addHours(time, Number(split[0]));

        const addedMin = addMinutes(addedHour, Number(split[1]));
        // const formatted = b.date.toISOString()
        // const formatted = time.getMonth();
        // const formattedDay = time.getDate();
        // const formattedYear = time.getFullYear();
        // const formattedHour = time.getHours();
        // const formattedMin = time.getMinutes();

        // const year = getYear(time);
        const formated = formatDate(time, "MM/dd/yy");

        const distance = formatDistanceToNow(time);
        const stric = formatDistanceStrict(addedMin, new Date(), );

        // const numb = timeConvert()

        // const split = b.time.split(":");

        const sHour = split[0];
        const sMin = split[1];

        let numb = null;

        if (Number(sHour) > 12) {
          numb = sHour % 12;
        }

        console.log(split);

        console.log(b.time);

        return (
          <div
            key={b._id}
            className="flex flex-col items-center justify-center gap-6 bg-[#c5c5c5] w-full  md:w-2/3 md:mx-auto py-8  px-6 rounded-xl  "
          >
            <div className="md:flex gap-10 text-black text-center w-full justify-evenly mt-2 border-b-white border-b-2 pb-2 font-extrabold ">
              <p className=" text-2xl md:text-3xl pb-2">{stric} away</p>
              <div className="flex justify-center gap-8">
              <p className="md:text-3xl">Booked for: </p>
              <p className="md:text-3xl">{formated}</p>
              <p className="md:text-3xl">
                {numb ?? sHour} : {sMin} {numb ? "pm" : "am"}
              </p>
              </div>

              
            </div>

            <div className="md:text-3xl md:flex gap-8 text-center text-black w-full justify-evenly border-b-2 pb-2 font-extrabold">
              <div className="flex gap-4 justify-center ">

              <p>Student:</p>
              <p>{capitalize(b.student.username)}</p>
              </div>
              <div className=" relative ">
                <p className="truncate"> {b.student.email}</p>
                <p className=" absolute  md:-top-2 md:-right-10 text-xs flex">
                  Verified
                  {b.student.emailVerified ? (
                    <FcCheckmark className="w-6 h-6 pb-1.5 text-green-300 " />
                  ) : (
                    <FcCancel className="w-4 h-4 pb-1.5" />
                  )}
                </p>
              </div>
            </div>

            <div className={` md:flex text-center justify-evenly w-full font-extrabold`}>
              <p className=" text-xl md:text-3xl text-black">Status: {b.status}</p>
              <p className="text-xl md:text-3xl text-black">Group Size: {b.groupSize}</p>
            </div>
            <div className="text-black text-end w-full font-semibold">
              <button
                onClick={() => onCancelBook(b._id)}
                className="hover:text-red-400"
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
