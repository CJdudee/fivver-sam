import { capitalize, gerFormat } from "@/utils/helpers";
import { formatDate, parse } from "date-fns";
import { DateTime } from "luxon";
import React from "react";
import { FcClock } from "react-icons/fc";
import { HiClock } from "react-icons/hi";

export default function OldBookingMap({ userData, data, isTeacher }: any) {
  const splitTime = data.time.split(":");

  const startDate = DateTime.fromISO(data.date, { zone: "Europe/Berlin" })
    .setLocale("SJ")
    .startOf("day")
    .plus({ hours: Number(splitTime[0]), minutes: Number(splitTime[1]) })
    .toJSDate();

  let startNum = Number(splitTime[0]);

  let pm = false;

  if (startNum > 12) {
    startNum = startNum % 12;
    pm = true;
  }

  const parsedDate = formatDate(startDate, "kk:mm");

  const splitParsed = parsedDate.split(":");

  let parsedHour: number | string = Number(splitParsed[0]);

  if (parsedHour == 24) {
    parsedHour = "0";
  }

  if(Number(parsedHour) < 10) {
    parsedHour = `0${parsedHour}`
  }

  // console.log(startDate, data, parsedDate);

  // if (startNum == 12) {
  //   pm = true;
  // }

  const format = gerFormat(data.date);

  // const result = `${startNum}:${splitTime[1]}`;
  const result = `${parsedHour}:${splitParsed[1]}`;

  return (
    <div className="bg-white rounded-lg shadow-md px-6 py-4 text-gray-700 w-full outline outline-orange-600 outline-2">
      <div className="flex flex-row items-center justify-between md:items-center md:justify-between mb-4 w-full lg:w-2/3 mx-auto">
        <p className="text-lg font-bold">Date: {format}</p>
        <div className="flex items-center gap-2 justify-center">
          {/* <HiClock className="text-orange-500 w-6 h-6" /> */}
          <p className="text-lg font-bold">Time: {result}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between md:w-full mx-auto">
        <p className=" font-bold text-xl mb-2">{!isTeacher ? "For Student:" : "Teacher:"}</p>
        <div className="flex flex-col bg-gray-700 w-full p-4 rounded-2xl text-white items-center gap-1">
          {/* <p className="font-bold">Name:</p> */}
          <div className="flex w-full justify-center gap-4">
            <p className="text-base font-semibold ml-2">
              {capitalize(userData.firstName)}
            </p>
            <p className="text-base font-semibold ml-2">
              {capitalize(userData.lastName)}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center font-semibold gap-2">
            <p>Email:</p>
          <p className=" font-bold">{userData.email}</p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center font-[600] text-lg">
        Group Size: {data.groupSize}
      </p>
    </div>
  );
}

// text-[#FF8911]
