"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  add,
  addDays,
  addHours,
  addMinutes,
  format,
  formatDate,
  formatISO,
  isBefore,
  parse,
  parseISO,
} from "date-fns";
import {
  gerFormat,
  getOpeningTimeFrame,
  getOpeningTimes,
  roundToNearestMinutes,
  simpleJson,
} from "@/utils/helpers";
import Calendar from "react-calendar";
import { bookAppt } from "@/actions/userBook";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { Transition } from "@headlessui/react";
import { DateTime } from "luxon";

export default function UserCalendar({
  teacher,
  teacherWeek,
  closedDate,
  user,
  booked,
  groupSize,
  setGroupSize,
  setTokensObj,
  tokensObj,
}: any) {
  const [isShowing, setIsShowing] = useState(false)
  // const [groupSize, setGroupSize] = useState(1)
  const [date, setDate] = useState<any>({
    justDate: null,
    dateTime: null,
  });
  const [displayDate, setDisplayDate] = useState<any>(null);

  const [bookedState, setBookedState] = useState(booked);

  console.log(booked);

  // useEffect(() => {
  //   setTimeout(() => {

  //     setIsShowing(true)
  //   }, 1000)
  // }, [])

  useEffect(() => {
    if(date.justDate) setIsShowing(true) 

    if(!date.justDate) setIsShowing(false)

  }, [date.justDate])

  const handleSave = async () => {
    // console.log(date)
    const book = await bookAppt(date, teacher._id, user.id, groupSize);

    if (!book) return errorToast();

    if (book.error) return errorToast(book.error);

    const copy = [...bookedState, book.data];

    setBookedState(copy);
    setDate((prev: any) => {
      return { ...prev, dateTime: null };
    });

    const newArray = { ...tokensObj };

    // const tokenGroup = [
    //   newArray.firstGroupTokens,
    //   newArray.secondGroupTokens,
    //   newArray.thirdGroupTokens,
    // ];

    if (groupSize == 1) {
      newArray.firstGroupTokens -= 1;
    }
    if (groupSize == 2) {
      newArray.secondGroupTokens -= 1;
    }
    if (groupSize == 3) {
      newArray.thirdGroupTokens -= 1;
    }
    // tokenGroup[groupSize - 1] - 1

    console.log(tokensObj, newArray, "yo you what");

    setTokensObj(newArray);

    susToast(book.msg as string);
    // console.log(book);
  };
  // console.log(teacher)
  const now = addDays(new Date(), 1);

  console.log(now);

  const today = teacherWeek?.weekdays.find(
    (d: any) => d.index === now.getDay()
  );

  if (!today)
    return (
      <>
        <p className="text-xl text-center">Problem with Getting scheldue</p>
        <Link href={"/"} className="text-xl flex justify-center underline">
          Go Back home
        </Link>
      </>
    );

  // const router = useRouter();

  const rounded = roundToNearestMinutes(now, 60);
  const closing = parse(today!.closeTime, "kk-mm", now);
  const tooLate = !isBefore(rounded, closing);

  if (tooLate) closedDate.push(formatISO(new Date()));

  // console.log(teacherWeek, now.getDay());

  const times =
    date.justDate && getOpeningTimeFrame(date.justDate, teacherWeek.weekdays);
  console.log(times, 'this is time and shit ');
  return (
    <div className=" px-2 overflow-hidden">
      <button
        className="font-semibold hover:underline text-2xl"
        onClick={() => {
          setGroupSize(null);
        }}
      >
        {"<"} Group Size: {groupSize}
      </button>
      {date.justDate ? (
        <div className="">
          <button
            className="text-2xl mb-4"
            onClick={() => {
              setDate({
                justDate: null,
                dateTime: null,
              });

              setDisplayDate(null);
            }}
          >
            <IoArrowBackCircleSharp className=" bg-transparent w-8 h-8 text-[#D9643A] " />
          </button>
          <Transition show={isShowing}
          className={` `}
          // enter="transition-opacity duration-75"
          // enterFrom="opacity-0"
          // enterTo="opacity-100"
        //   enter="transition-opacity duration-300 "
        // enterFrom="opacity-0"
        // enterTo="opacity-100"
        // leave="transition-opacity duration-150"
        // leaveFrom="opacity-100"
        // leaveTo="opacity-0"
        enter='transform transition ease-in-out duration-300 sm:duration-700'
        enterFrom='translate-y-full'
        enterTo='translate-y-0'
        leave='transform transition ease-in-out duration-300 sm:duration-700'
        leaveFrom='translate-y-0'
        leaveTo='translate-y-full'
          >
            <div className="bg-slate-100 text-black py-8 pt-6 px-2 md:px-8 w-full rounded-t-3xl rounded-b-xl  ">
              <p className="text-center text-2xl font-bold mb-2">
                Selecte A Time
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 row-auto flex-col gap-4 w-full  ">
                {times?.map((time: any, i: number) => {
                  const foundBook = bookedState.find(
                    (b: any) =>
                      b.date == date.justDate.toISOString() &&
                      b.time == format(time, "kk:mm")
                  );

                  
                  console.log(time, 'before edit')
                  // time = DateTime.fromJSDate(time).setZone('Europe/Berlin')
                  time = new Date(time).toLocaleString('SJ', { timeZone: 'Europe/Berlin' })
                  console.log(time, 'after edit')

                  const formatedKk = Number(format(time, "kk"));
                  const formatedMin = Number(format(time, "mm"));

                  const isUnderDate =
                    now >
                    addMinutes(
                      addHours(date.justDate, formatedKk),
                      formatedMin
                    );
                  // console.log(foundBook, "what");
                  // console.log(booked, 'what')

                  const isPickedTime = format(time, "kk:mm") == date.dateTime;

                  // console.log(time, 'time')

                  console.log(formatedKk, typeof formatedKk, time);

                  let numb: null | number = null;

                  if (formatedKk > 12) {
                    numb = formatedKk % 12;
                  }

                  // console.log(time);

                  return (
                    <div
                      key={`time-${i}`}
                      className={`${
                        isPickedTime && "bg-black text-white"
                      } rounded-xl bg-[#dfdfdf] text-black p-2 duration-300 transition-all`}
                    >
                      <button
                        disabled={foundBook || isUnderDate}
                        className=" flex justify-center gap-2  w-full font-bold text-xl disabled:text-gray-400"
                        type="button"
                        onClick={() => {
                          setDate((prev: any) => ({
                            ...prev,
                            dateTime: format(time, "kk:mm"),
                          }));

                          setDisplayDate(() => {
                            if (numb != null) {
                              setDisplayDate(
                                `${numb} : ${format(time, "mm")} pm`
                              );
                            } else {
                              setDisplayDate(
                                `${formatedKk} : ${format(time, "mm")} am`
                              );
                            }
                          });
                        }}
                      >
                        {/* {format(time, 'kk:mm')} */}
                        <p>{numb ?? `${format(time, "kk")}`}</p>
                        <p>:</p>
                        <p>{format(time, "mm")}</p>
                        <p>{numb || formatedKk == 12 ? "pm" : "am"}</p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Transition>
        </div>
      ) : (
        <div className=" md:px-20">
          <Calendar
            minDate={addDays(new Date(), 1)}
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

      <div className=" flex flex-col justify-center items-center h-full gap-4 mt-8">
        {date.justDate && date.dateTime && (
          <>
            <button
              // onClick={handleSave}

              onClick={() => {
                console.log(date);
                handleSave();
              }}
              className="bg-[#D9643A] hover:bg-[#D9543A] active:bg-[#994433] px-4 py-1 rounded-full w-full font-bold"
            >
              Book lesson
            </button>
            <div className="flex flex-col w-full md:w-2/3 mx-auto gap-1 text-white rounded-full ">
              <p className="text-bold md:w-1/2 text-center font-bold text-xl mx-auto">
                Time selected {displayDate}
              </p>

              <p
                onClick={() => {
                  console.log(typeof date.justDate, date.justDate);
                }}
                className="text-bold w-full md:w-1/2 text-center font-bold text-xl mx-auto"
              >
                Date selected: {gerFormat(date.justDate)}
                {/* {formatDate(date.justDate.toISOString(), "MM/dd/yyyy")} */}
              </p>
              <p className="text-bold md:w-1/2 text-center font-bold text-xl mx-auto">
                Group Size {groupSize}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
