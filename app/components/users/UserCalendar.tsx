"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { add, format, formatISO, isBefore, parse, parseISO } from "date-fns";
import { getOpeningTimes, roundToNearestMinutes } from "@/utils/helpers";
import Calendar from "react-calendar";
import { bookAppt } from "@/actions/userBook";

export default function UserCalendar({
  teacher,
  teacherWeek,
  closedDate,
  user,
  booked,
}: any) {
  const [date, setDate] = useState<any>({
    justDate: null,
    dateTime: null,
  });

  const handleSave = async () => {
    // console.log(date)
    await bookAppt(date, teacher._id, user.id);
  };
  // console.log(teacher)
  const now = new Date();

  const today = teacherWeek.weekdays.find((d: any) => d.index === now.getDay());

  const router = useRouter();

  const rounded = roundToNearestMinutes(now, 60);
  const closing = parse(today!.closeTime, "kk-mm", now);
  const tooLate = !isBefore(rounded, closing);

  if (tooLate) closedDate.push(formatISO(new Date()));

  // console.log(teacherWeek, now.getDay());

  const times =
    date.justDate && getOpeningTimes(date.justDate, teacherWeek.weekdays);
  console.log(times);
  return (
    <div>
      {date.justDate ? (
        <div className="grid grid-cols-2 row-auto flex-col gap-4 ">
          {times?.map((time: any, i: number) => {
            const foundBook = booked.find(
              (b: any) =>
                b.date == date.justDate.toISOString() &&
                b.time == format(time, "kk:mm")
            );
            console.log(foundBook, "what");
            // console.log(booked, 'what')

            return (
              <div key={`time-${i}`} className="rounded-full bg-gray-600 p-2">
                <button
                  disabled={foundBook}
                  className=" flex justify-center gap-2  w-full font-bold disabled:text-gray-400"
                  type="button"
                  onClick={() =>
                    setDate((prev: any) => ({
                      ...prev,
                      dateTime: format(time, "kk:mm"),
                    }))
                  }
                >
                  {/* {format(time, 'kk:mm')} */}
                  <p>{format(time, "kk")}</p>
                  <p>:</p>
                  <p>{format(time, "mm")}</p>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" px-20">
          <Calendar
            minDate={new Date()}
            tileDisabled={({ date }) => {
              const day = date.getDay();

              // console.log(teacherWeek)
              const foundDay = teacherWeek.weekdays.find(
                (d: any) => d.index == day
              );
              console.log(foundDay);

              if (foundDay.isOpen == false) return true;
              // if(teacherWeek.weekdays.find((d) => d.index = day)) return true
              //console.log(formatISO(date), 'Calendar')
              const dateClosed = closedDate.map((c: any) => c.date);
              // console.log(new Date (closedDaysISO), 'closedDays')
              return dateClosed.includes(date.toISOString());
              // return closedDate.includes((c: any) => c.date == date.toISOString() );
            }}
            className="REACT_CALENDAR p-2"
            view="month"
            onClickDay={(date) =>
              setDate((prev: any) => ({ ...prev, justDate: date }))
            }
          />
        </div>
      )}
      <div className="flex justify-center items-center h-20">
        {date.justDate && date.dateTime && (
          <button
            onClick={handleSave}
            className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 px-4 py-1 rounded-full"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
