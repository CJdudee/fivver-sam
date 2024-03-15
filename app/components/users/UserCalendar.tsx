"use client";

import { usePathname, useRouter } from "next/navigation";
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
  subHours,
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
import { serverActionRev } from "@/actions/revaildate";

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
  const [isShowing, setIsShowing] = useState(false);
  // const [groupSize, setGroupSize] = useState(1)
  const [date, setDate] = useState<any>({
    justDate: null,
    dateTime: null,
  });
  const [displayDate, setDisplayDate] = useState<any>(null);

  const [bookedState, setBookedState] = useState(booked);

  const pathName = usePathname();

  // console.log(pathName);

  useEffect(() => {
    setBookedState(booked)
  }, [booked])


  useEffect(() => {
    if (date.justDate) setIsShowing(true);

    if (!date.justDate) setIsShowing(false);
  }, [date.justDate]);

  const handleSave = async () => {
    // console.log(date)
    const book = await bookAppt(date, teacher._id, user.id, groupSize);

    if (!book) return errorToast();

    if (book?.booked) {
      await serverActionRev(pathName, 'page');
      errorToast(book.booked as string);
      return;
    }
    if (book.error) return errorToast(book.error as string);

    const copy = [...bookedState, book.data];

    setBookedState(copy);
    setDate((prev: any) => {
      return { ...prev, dateTime: null };
    });

    const newArray = { ...tokensObj };

    

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

    // console.log(tokensObj, newArray, "yo you what");

    setTokensObj(newArray);

    susToast(book.msg as string);
    await serverActionRev("/");
    // console.log(book);
  };
  // console.log(teacher)
  const now = addDays(new Date(), 1);

  // console.log(now);

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

  let futureClose = 0;

  const times =
    date.justDate && getOpeningTimeFrame(date.justDate, teacherWeek.weekdays);
  // console.log(times, "this is time and shit ");
  return (
    <div className=" px-2  w-full h-full ">
      <button
        className="font-semibold hover:underline text-2xl"
        onClick={() => {
          setGroupSize(null);
        }}
      >
        {"<"} Group Size: {groupSize}
      </button>
      {date.justDate ? (
        <div className="w-full">
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
          <Transition
            show={isShowing}
            className={` flex justify-center items-center h-full w-full`}
            // enter="transition-opacity duration-75"
            // enterFrom="opacity-0"
            // enterTo="opacity-100"
            //   enter="transition-opacity duration-300 "
            // enterFrom="opacity-0"
            // enterTo="opacity-100"
            // leave="transition-opacity duration-150"
            // leaveFrom="opacity-100"
            // leaveTo="opacity-0"
            enter="transform transition ease-in-out duration-300 sm:duration-700"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-300 sm:duration-700"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="bg-slate-100 text-black py-8 pt-6 px-2 md:px-8 w-full md:w-fit rounded-t-3xl rounded-b-xl  ">
              <p className="text-center text-2xl font-bold mb-2 w-full">
                Selecte A Time
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 row-auto flex-col gap-4  md:w-[80vw]   ">
                {times?.map(
                  (
                    time: { clientDate: Date; realDate: Date } | any,
                    i: number
                  ) => {
                    let disabledPast = false;

                    const compareDateFuture = DateTime.fromJSDate(time.realDate)
                      .plus({ minutes: 45 })
                      .toJSDate();

                    const futureFoundBook = bookedState.find(
                      (b: any) =>
                        b.date == date.justDate.toISOString() &&
                        b.time == format(compareDateFuture, "kk:mm")
                    );

                    // console.log(compareDateFuture, "compare");
                    // console.log(time.realDate.setHours(time.realDate.getHours() + 1), 'time')

                    const foundBook = bookedState.find(
                      (b: any) =>
                        b.date == date.justDate.toISOString() &&
                        b.time == format(time.realDate, "kk:mm")
                    );

                    if (foundBook) {
                      futureClose = 4;
                    }

                    if (futureFoundBook) {
                      futureClose = 3;
                    }

                    if (futureClose > 0) {
                      futureClose -= 1;
                      disabledPast = true;
                    }

                    // console.log(futureClose, disabledPast);

                    const timeObj = time;

                    time = DateTime.fromJSDate(time.clientDate, {
                      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    }).toJSDate();

                    let formatedKk = Number(format(time, "kk"));
                    const formatedMin = Number(format(time, "mm"));

                    const isUnderDate =
                      now >
                      addMinutes(
                        addHours(date.justDate, formatedKk),
                        formatedMin
                      );
                    // console.log(formatedKk, "what");
                    // console.log(booked, 'what')

                    const isPickedTime =
                      format(timeObj.realDate, "kk:mm") == date.dateTime;

                    // console.log(time, 'time')

                    // console.log(formatedKk, typeof formatedKk, time);
                    let pm = false;

                    let numb: null | number = null;

                    if (formatedKk > 12) {
                      numb = formatedKk % 12;
                      pm = true;

                      if (formatedKk == 24) {
                        formatedKk = 0;
                        pm = false;
                      }
                      // if(numb == 0) {
                      //   numb = 12
                      // }
                    }

                    if (formatedKk == 12) {
                      pm = true;
                    }

                    // console.log(time);

                    return (
                      <div
                        key={`time-${i}`}
                        className={`${
                          isPickedTime && "bg-black text-white "
                        } rounded-xl bg-[#dfdfdf] text-black p-2 duration-300 transition-all`}
                      >
                        <button
                          disabled={foundBook || isUnderDate || disabledPast}
                          className=" flex justify-center gap-2  w-full font-bold text-xl disabled:text-gray-400"
                          type="button"
                          onClick={() => {
                            setDate((prev: any) => ({
                              ...prev,
                              dateTime: format(timeObj.realDate, "kk:mm"),
                            }));

                            setDisplayDate(() => {
                              if (numb != null) {
                                setDisplayDate(
                                  `${numb} : ${format(
                                    timeObj.realDate,
                                    "mm"
                                  )} pm`
                                );
                              } else {
                                setDisplayDate(
                                  `${formatedKk} : ${format(
                                    timeObj.realDate,
                                    "mm"
                                  )} am`
                                );
                              }
                            });
                          }}
                        >
                          <p>
                            {formatedKk < 10
                              ? `0${formatedKk}`
                              : formatedKk ?? `${format(time, "kk")}`}
                          </p>
                          <p>:</p>
                          <p>{format(time, "mm")}</p>
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </Transition>
        </div>
      ) : (
        <div className=" h-full w-full md:w-fit lg:w-full">
          <Calendar
            minDate={addDays(new Date(), 1)}
            tileDisabled={({ date }) => {
              const day = date.getDay();

              // console.log(teacherWeek)
              const foundDay = teacherWeek.weekdays.find(
                (d: any) => d.index == day
              );
              // console.log(foundDay);

              if (foundDay.isOpen == false) return true;
              // if(teacherWeek.weekdays.find((d) => d.index = day)) return true
              //console.log(formatISO(date), 'Calendar')
              const dateClosed = closedDate.map((c: any) => c.date);
              // console.log(new Date (closedDaysISO), 'closedDays')
              return dateClosed.includes(date.toISOString());
              // return closedDate.includes((c: any) => c.date == date.toISOString() );
            }}
            className="REACT_CALENDAR lg:p-2"
            view="month"
            onClickDay={(date) => {
              // var copyDay = new Date("2019-09-06T00:00:00.000Z");
              // var ldate = DateTime.fromJSDate(copyDay);
              // var ldate = ldate.setZone("utc");
              // console.log(ldate.toJSDate());

              // var convertedDate = DateTime.local();
              // convertedDate.setZone("Asia/Shanghai");
              // convertedDate = convertedDate.set({
              //   year: ldate.year,
              //   month: ldate.month,
              //   day: ldate.day,
              //   hour: ldate.hour,
              //   minute: ldate.minute,
              //   second: ldate.second,
              //   millisecond: ldate.millisecond,
              // });
              // console.log(convertedDate.toJSDate());

              const isoDate = DateTime.fromJSDate(date, {
                zone: "Europe/Berlin",
              })
                .toUTC()
                .toISO();

              const minDate = subHours(
                new Date(date),
                new Date(date).getHours()
              );
              // const dateTest = DateTime.fromISO(isoDate, {
              //   zone: "Europe/Berlin",
              // });

              // console.log(dateTest, "yo waht thea lf");

              const randTest = DateTime.fromJSDate(date, {
                zone: "Europe/Berlin",
              });

              const result = randTest.setZone("Europe/Berlin");

              const upDated = result.setZone("Europe/Berlin");

              const sloved = randTest.setLocale("SJ").toLocal().toJSDate();

              // console.log(
              //   randTest.setLocale("SJ").startOf("day").toJSDate().getDate(),
              //   "space",
              //   result,
              //   upDated
              // );

              // console.log(
              //   "try again",
              //   randTest
              //     .setZone("local", { keepLocalTime: true })
              //     .startOf("day")
              //     .toJSDate()
              // );
              // console.log(result.setZone("system", { keepLocalTime: true}).startOf('day').toJSDate())
              // console.log(date, upDated.toJSDate());
              // console.log(
              //   new Date(date).toLocaleString("SJ", {
              //     timeZone: "Europe/Berlin",
              //   })
              // );

              const bullshit = new Date(date).toLocaleDateString("SJ", {
                timeZone: "Europe/Berlin",
              });

              // console.log(date, 'this is on clikc',  dateTest, subHours(dateTest, 8 ), DateTime.fromISO(dateTest).setZone('Europe/Berlin').toISO())
              // setDate((prev: any) => ({ ...prev, justDate: sloved }));
              setDate((prev: any) => ({ ...prev, justDate: date }));
              // setDate((prev: any) => ({ ...prev, justDate: date }))
            }}
          />
        </div>
      )}

      <div className=" flex flex-col justify-center items-center h-full gap-4 mt-8">
        {date.justDate && date.dateTime && (
          <>
            <button
              // onClick={handleSave}

              onClick={() => {
                // console.log(date);
                handleSave();
              }}
              className="bg-[#D9643A] hover:bg-[#D9543A] active:bg-[#994433] px-4 py-1 rounded-full w-full font-bold"
            >
              Book lesson
            </button>
            <div className="flex flex-col w-full md:w-2/3 mx-auto gap-1 text-white rounded-full pb-10 ">
              <p className="text-bold md:w-1/2 text-center font-bold text-xl mx-auto">
                Time selected {displayDate}
              </p>

              <p
                onClick={() => {
                  // console.log(typeof date.justDate, date.justDate);
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
