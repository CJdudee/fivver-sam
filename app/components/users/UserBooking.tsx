"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { add, format, formatISO, isBefore, parse, parseISO } from "date-fns";
import { capitalize, getOpeningTimes, roundToNearestMinutes } from "@/utils/helpers";
import Calendar from "react-calendar";
import UserCalendar from "./UserCalendar";

export default function UserBooking({ teacher, teacherWeek, closedDate, user, booked }: any) {

  const [groupSize, setGroupSize ] = useState<null | number>(null)
  // console.log(teacher, "yo");

  return (
    <div className="h-full">
      <p className="text-center text-3xl font-extrabold">{capitalize(teacher.user.username)}</p>
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
      <div className=" md:px-40 pt-0 flex flex-col justify-center items-center my-40 ">
        <button onClick={() => {setGroupSize(1)}}>1</button>
        <button onClick={() => {setGroupSize(2)}}>2</button>
        <button onClick={() => {setGroupSize(3)}}>3</button>
      </div>
      )}
    </div>
  );
}
