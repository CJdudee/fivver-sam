"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  add,
  format,
  formatDate,
  formatISO,
  isBefore,
  parse,
  parseISO,
} from "date-fns";
import {
  getOpeningTimes,
  roundToNearestMinutes,
  simpleJson,
} from "@/utils/helpers";
import Calendar from "react-calendar";
import { bookAppt } from "@/actions/userBook";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function UserCalendar({
  teacher,
  teacherWeek,
  closedDate,
  user,
  booked,
  groupSize,
  setGroupSize
}: any) {
  // const [groupSize, setGroupSize] = useState(1)
  const [date, setDate] = useState<any>({
    justDate: null,
    dateTime: null,
  });
  const [displayDate, setDisplayDate] = useState<any>(null);

  const handleSave = async () => {
    // console.log(date)
    const book = await bookAppt(date, teacher._id, user.id, groupSize);

    console.log(book)
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
    <div className="">
      <button onClick={() => { setGroupSize(null)}}>Group Size: {groupSize}</button>
      {date.justDate ? (
        <div className="">
          <button
            className="text-2xl mb-4"
            onClick={() => {
              setDate({
                justDate: null,
                dateTime: null,
              });
            
              setDisplayDate(null)
            }}
          >
            <IoArrowBackCircleSharp className=" bg-transparent w-8 h-8 text-[#D9643A]" />
          </button>
          <div className="grid grid-cols-2 row-auto flex-col gap-4 ">
            {times?.map((time: any, i: number) => {
              const foundBook = booked.find(
                (b: any) =>
                  b.date == date.justDate.toISOString() &&
                  b.time == format(time, "kk:mm")
              );
              // console.log(foundBook, "what");
              // console.log(booked, 'what')

              const formatedKk = Number(format(time, "kk"));

              // console.log(time, 'time')

              console.log(formatedKk, typeof formatedKk);

              let numb = null;

              if (formatedKk > 12) {
                numb = formatedKk % 12;
              }

              console.log(numb);

              return (
                <div
                  key={`time-${i}`}
                  className="rounded-xl bg-[#dfdfdf] text-black p-2"
                >
                  <button
                    disabled={foundBook}
                    className=" flex justify-center gap-2  w-full font-bold disabled:text-gray-400"
                    type="button"
                    onClick={() => {
                      setDate((prev: any) => ({
                        ...prev,
                        dateTime: format(time, "kk:mm"),
                      }));

                      setDisplayDate(() => {
                        if(numb != null) {
                          setDisplayDate(`${numb} : ${format(time, 'mm')} pm`)
                        } else {

                          setDisplayDate(`${formatedKk} : ${format(time, 'mm')} am`)
                        }
                      });
                    }}
                  >
                    {/* {format(time, 'kk:mm')} */}
                    <p>{numb ?? `${format(time, "kk")}`}</p>
                    <p>:</p>
                    <p>{format(time, "mm")}</p>
                    <p>{numb ? "pm" : "am"}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className=" md:px-20">
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

      <div className=" flex flex-col justify-center items-center h-20 gap-4 mt-8">
        {date.justDate && date.dateTime && (
          <>
            <button
              // onClick={handleSave}
              onClick={() => {
                console.log(date);
                handleSave()
              }}
              className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 px-4 py-1 rounded-full w-full"
            >
              Book lesson
            </button>
            <div className="flex flex-col w-2/3 mx-auto gap-1 bg-[#d5d5d5] rounded-full text-black">

            <p className="text-bold w-1/2 text-center font-bold text-xl mx-auto">Time selected: {displayDate}</p>
            <p onClick={() => {
              console.log(typeof date.justDate, date.justDate)
            }} className="text-bold w-1/2 text-center font-bold text-xl mx-auto">Date selected: {(formatDate(date.justDate.toISOString(), 'MM/dd/yyyy'))}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
