"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { add, format, formatISO, isBefore, parse, parseISO } from "date-fns";
import { capitalize, getOpeningTimes, roundToNearestMinutes } from "@/utils/helpers";
import Calendar from "react-calendar";
import UserCalendar from "./UserCalendar";
import SettingGroup from "./booking/SettingGroup";
import Link from "next/link";

export default function UserBooking({ teacher, teacherWeek, closedDate, user, booked }: any) {

  const [groupSize, setGroupSize ] = useState<null | number>(null)
  // console.log(teacher, "yo");

  const teachName = teacher.user.username

  const router = useRouter()

  return (
    <div className="h-full">
      <div className="flex w-full justify-evenly">
      <p className="text-center text-3xl font-extrabold w-1/2">{capitalize(teachName)}</p>
      <button className="w-1/2 text-center" onClick={() => router.back()}>Go Back</button>

      </div>
      {groupSize != null && (
      <div className=" md:px-40 pt-0 ">
        <UserCalendar
          teacher={teacher}
          teacherWeek={teacherWeek}
          closedDate={closedDate}
          user={user}
          booked={booked}
          groupSize={groupSize}
          setGroupSize={setGroupSize}
        />
      </div>
      )}
      {groupSize == null && (
      // <div className=" md:px-40 pt-0 flex flex-col justify-center items-center my-40 gap-8 w-1/2 mx-auto text-black font-extrabold ">
      //   <button className="bg-[#c5c5c5] px-8 py-1 w-full rounded-full" onClick={() => {setGroupSize(1)}}>For a single person</button>
      //   <button className="bg-[#c5c5c5] px-8 py-1 w-full rounded-full" onClick={() => {setGroupSize(2)}}>For a Group of 2</button>
      //   <button className="bg-[#c5c5c5] px-8 py-1 w-full rounded-full" onClick={() => {setGroupSize(3)}}>For a Group of 3</button>
      // </div>
      <SettingGroup setGroupSize={setGroupSize} teacherName={teachName} />
      )}
    </div>
  );
}
