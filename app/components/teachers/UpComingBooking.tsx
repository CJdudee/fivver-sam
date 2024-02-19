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
import { capitalize, gerFormat } from "@/utils/helpers";
import { DateTime } from "luxon";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function UpComingBooking({ booked, onCancelBook }: any) {
  const filtedBooked = booked.filter((b: any) => {
    let time = new Date(b.date);
    const split = b.time.split(":");

    time = DateTime.fromJSDate(time, { zone: "Europe/Berlin" })
      .setLocale("SJ")
      .startOf("day")
      .toJSDate();

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
      <div className="flex flex-col gap-6">
        {filtedBooked.map((b: any) => {
          const time = new Date(b.date);

          const split = b.time.split(":");
          const addedHour = addHours(time, Number(split[0]));

          const addedMin = addMinutes(addedHour, Number(split[1]));

          // const year = getYear(time);
          const formated = gerFormat(time);

          const distance = formatDistanceToNow(time);
          const stric = formatDistanceStrict(addedMin, new Date());

          // const numb = timeConvert()

          // const split = b.time.split(":");

          const sHour = split[0];
          const sMin = split[1];

          let numb = null;

          if (Number(sHour) > 12) {
            numb = sHour % 12;
          }

          // console.log(split);

          // console.log(b.time);

          return (
            <div
              key={b._id}
              className="flex flex-col items-center justify-center gap-4 bg-[#c5c5c5] w-full  md:w-2/3 md:mx-auto py-8  px-6 rounded-xl relative  "
            >
              <p className=" text-2xl md:text-3xl  font-extrabold mb-4 absolute top-2 left-4 underline-offset-2 underline">
                {stric} away
              </p>

              <div className="text-center w-full mt-2 md:mt-6 ">
                <div className="md:flex gap-10 text-black text-center w-full justify-evenly  border-b-white border-b-2 py-6 font-extrabold ">
                  <div className="flex justify-evenly gap-8 w-full">
                    <p className="md:text-3xl">Booked for: </p>
                    <p className="md:text-3xl">{formated}</p>
                    <p className="md:text-3xl">
                      At: {numb ?? sHour} : {sMin} {numb ? "pm" : "am"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
              <p className="text-center text-3xl font-bold underline underline-offset-4 mb-2">Student:</p>
                <div className="md:text-3xl md:flex flex-col gap-4 text-center text-black w-full justify-evenly border-b-2 py-6 font-extrabold border-t-2 rounded-2xl drop-shadow-2xl shadow-xl">
                  <div className="flex gap-4 justify-center relative ">
                    <p>Username:</p>
                    <p>{capitalize(b.student.username)}</p>
                    <p className=" absolute -top-4 text-xs flex">
                      Verified
                      {b.student.emailVerified ? (
                        <FcCheckmark className="w-6 h-6 pb-1.5 text-green-300 " />
                      ) : (
                        <FcCancel className="w-4 h-4 pb-1.5" />
                      )}
                    </p>
                  </div>
                  <div className=" relative ">
                    <p className="truncate"> {b.student.email}</p>
                    {!b.student.email && <p className="truncate">No Email</p>}
                    {/* <p className=" absolute  md:-top-2 md:-right-10 text-xs flex">
                      Verified
                      {b.student.emailVerified ? (
                        <FcCheckmark className="w-6 h-6 pb-1.5 text-green-300 " />
                      ) : (
                        <FcCancel className="w-4 h-4 pb-1.5" />
                      )}
                    </p> */}
                  </div>
                </div>
              </div>

              <div
                className={` md:flex text-center justify-evenly w-full font-extrabold`}
              >
                <p className=" text-xl md:text-3xl text-black">
                  Status: {b.status}
                </p>
                <p className="text-xl md:text-3xl text-black">
                  Group Size: {b.groupSize}
                </p>
              </div>
              {/* <div className="text-black text-end w-full font-semibold">
              <button
                onClick={() => onCancelBook(b._id)}
                className="hover:text-red-400"
              >
                Cancel
              </button>
            </div> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
