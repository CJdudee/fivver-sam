"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { add, format, formatISO, isBefore, parse, parseISO } from "date-fns";
import { getOpeningTimes, roundToNearestMinutes } from "@/utils/helpers";
import Calendar from "react-calendar";
import UserCalendar from "./UserCalendar";

export default function UserBooking({ teacher, teacherWeek, closedDate, user, booked }: any) {
  // console.log(teacher, "yo");

  return (
    <div>
      <p className="text-center text-3xl">{teacher.user.username}</p>
      <div className=" p-40 pt-0">
        <UserCalendar
          teacher={teacher}
          teacherWeek={teacherWeek}
          closedDate={closedDate}
          user={user}
          booked={booked}
        />
      </div>
    </div>
  );
}
