import { capitalize, gerFormat } from "@/utils/helpers";
import Link from "next/link";
import React from "react";
import { CgCalendar, CgCalendarDates, CgCalendarTwo } from "react-icons/cg";
import { FcClock } from "react-icons/fc";
import { HiClock } from "react-icons/hi";
import { LuClock, LuGroup } from "react-icons/lu";
import { MdGroupWork, MdGroups2, MdGroups3 } from "react-icons/md";

export default function PastBookings({ userData, data, isTeacher }: any) {
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

  console.log(data);

  return (
    <div className="bg-gray-600 outline outline-1 outline-black drop-shadow-2xl shadow-xl text-white font-bold w-full md:w-2/3 text-center rounded-3xl py-4 px-4">
      <div className="flex flex-col md:flex-row  md:justify-between xl:justify-evenly w-full mb-4 items-center">
        <div className="text-center font-extrabold text-2xl md:w-1/2 flex items-center gap-2 justify-center ">
          {/* <FcClock className="text-[#FF8911]" /> */}
          <LuClock className=" text-white   " />
          <p>
            Time {result} {pm ? "pm" : "am"}
          </p>
        </div>
        <div className=" md:w-1/2 flex justify-center gap-2">
        <CgCalendar className="w-7 h-7" />
        <p className="text-center font-extrabold text-2xl ">
          Booked For {format}
        </p>
        </div>
      </div>
      <div className="flex justify-center gap-2">

      <p className="mb-2 text-2xl ">Group Size {data.groupSize}</p>
      <MdGroups2 className="w-7 h-7" />
      </div>
      <div className="text-xl">
        <p className="text-2xl font-extrabold mb-2 ">
          {!isTeacher ? " Student Info:" : "Teacher Info:"}
        </p>
        <div className="bg-[#eee] rounded-[1em] m-0 p-[1em] text-black">
          <div className="flex justify-center gap-2">
            <p>Name:</p>
            <Link
              href={
                isTeacher
                  ? `/dashboard/viewteachers/${data.teacher._id}`
                  : `/dashboard/viewusers/${userData._id}`
              }
              className="text-xl hover:text-gray-600"
            >
              {capitalize(userData.username)}
            </Link>
          </div>
          <div>
            {!userData.email && (
              <div>
                <p>No Email</p>
              </div>
            )}
            {userData.email && (
              <div className="flex justify-center gap-2">
                <p>Email</p>
                <p>{userData?.email}</p>
              </div>
            )}

            {/* <p>{userData?.email}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// text-[#FF8911]
