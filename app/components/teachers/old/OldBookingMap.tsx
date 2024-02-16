import { capitalize, gerFormat } from "@/utils/helpers";
import React from "react";
import { FcClock } from "react-icons/fc";
import { HiClock } from "react-icons/hi";

export default function OldBookingMap({ userData, data, isTeacher }: any) {
  const splitTime = data.time.split(":");

  let startNum = Number(splitTime[0]);

  let pm = false;

  if (startNum > 12) {
    startNum = startNum % 12;
    pm = true;
  }

  if (startNum == 12) {
    pm = true;
  }

  const format = gerFormat(data.date);

  const result = `${startNum}:${splitTime[1]}`;

  return (
    <div className="bg-gray-600 drop-shadow-xl shadow-xl text-white font-bold w-full md:w-2/3 text-center rounded-3xl py-4 px-4">
      <div className="flex flex-col md:flex-row  md:justify-between xl:justify-evenly w-full mb-4 items-center">
        <div className="text-center font-extrabold text-2xl md:w-1/2 flex items-center gap-2 justify-center ">

            {/* <FcClock className="text-[#FF8911]" /> */}
            <HiClock className=" text-[#D9643A]  " />
        <p >
          Time {result} {pm ? "pm" : "am"}
        </p>
        </div>
        <p className="text-center font-extrabold text-2xl md:w-1/2 ">
          Booked For {format}
        </p>
      </div>
      <p className="mb-2 text-2xl ">Group Size {data.groupSize}</p>
      <div className="text-xl">
        <p className="text-2xl font-extrabold ">{!isTeacher ? "For Student:" : "Teacher:"}</p>
        <p className="text-xl">{capitalize(userData.username)}</p>
      </div>
    </div>
  );
}


// text-[#FF8911]