"use client";

import { capitalize, weedayIndexToName } from "@/utils/helpers";
import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import TimeSelector from "./TimeSelector";
import {
  closeTheDay,
  openTheDay,
  updateWorkDays,
} from "@/actions/updateWorkDay";
import TeacherCalendar from "./TeacherCalendar";
import { errorToast, susToast } from "@/app/lib/react-toast";

export default function TeacherSchedule({
  weekDays,
  id,
  teacherId,
  daysClosed,
}: any) {
  const [enabled, setEnabled] = useState(false);

  const [dayWeek, setDayWeek] = useState(weekDays);
  const [closedDays, setClosedDays] = useState(daysClosed ?? []);
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [dayIsClosed, setDayIsClosed] = useState(false);

  console.log(closedDays);
  useEffect(() => {
    if (!selectedDate && !closedDays) return;

    //this is for the date that is returned and set from the calendar which doesn't match if the date isn't a string so the date has to be turned into a string //refactoring is very needed for this
    let closedDaysArray: any[] = [];
    closedDays.map((c: any) => {
      if (c.date == `${selectedDate?.toISOString()}`)
        closedDaysArray.push(c.date);
      else console.log(c.date == `${selectedDate?.toISOString()}`);
    });

    // console.log(( selectedDate ), closedDays, 'hellow')
    // async function workplz() {
    if (closedDaysArray.length) {
      setDayIsClosed(true);
      closedDaysArray = [];
    } else {
      setDayIsClosed(false);
      closedDaysArray = [];
    }
  }, [selectedDate, closedDays]);

  // useEffect( () => {
  //   if(!daysClosed) return

  //   let dayisClosedArray: any[] = []

  //   async function filteringDate() {
  //     await daysClosed?.map((c: any) => {
  //       dayisClosedArray.push(new Date(c.date))
  //       // dayisClosedArray.push((c.date))
  //       //  console.log((new Date(c.date)))
  //     })

  //   }

  //   filteringDate()

  //   setClosedDays(dayisClosedArray)
  //   console.log(dayisClosedArray)

  // }, [daysClosed])

  // console.log(dayWeek);

  const handleSavingWeek = async () => {
    const saved = await updateWorkDays(id, dayWeek);

    if(!saved) return errorToast()

    weekDays = dayWeek
    return susToast(saved.msg)

  };

  const handleCloseDay = async (date: Date) => {
    const closedDate = await closeTheDay(date, teacherId);

    console.log(closedDate, "yoyu yo");
    const dateCopy = [...closedDays];

    dateCopy.push(closedDate);
    setClosedDays(dateCopy);
  };
  const handleOpenDay = async (date: Date) => {
    const openDay = await openTheDay(date, teacherId);

    let dateCopy = [...closedDays];

    dateCopy = dateCopy.filter((d) => d._id != openDay._id);

    // console.log(openDay)
    setClosedDays(dateCopy);
  };

  function _changeTime(day: any) {
    return function (time: string, type: "openTime" | "closeTime") {
      const index = dayWeek.findIndex(
        (x: any) => x.name === weedayIndexToName(day.index)
      );
      const newOpeningHrs = [...dayWeek];
      newOpeningHrs[index]![type] = time;
      setDayWeek(newOpeningHrs);
    };
  }

  function openDay(index: number) {
    const copy = [...dayWeek];

    copy[index].isOpen = !copy[index].isOpen;

    setDayWeek(copy);
  }

  const setWeekDaysJsx = (
    <>
    {weekDays != dayWeek && <button
        className="text-center text-white mt-1 mb-3 font-bold outline outline-1 px-8 py-0.5 rounded-full w-1/3 hover:text-gray-400 hover:outline-white"
        onClick={handleSavingWeek}
      >
        Save
      </button>}
      <ul className="text-center h-full flex flex-col lg:grid grid-cols-2 justify-between items-center w-full text-black font-bold font-mono text-xl gap-4 md:px-2  lg:px-12">
        {dayWeek.map((w: any, mapindex: number) => {
          const changeTime = _changeTime(w);

          return (
            <li
              className="h-full w-full bg-[#c4c4c4] rounded-xl py-4"
              key={w.name}
            >
              <p>{capitalize(w.name)}</p>
              <div className="flex w-full justify-evenly">
                <div className="px-1 w-full md:px-0 md:w-1/3">
                  <TimeSelector
                    type="openTime"
                    changeTime={changeTime}
                    selected={dayWeek[mapindex]?.openTime}
                  />
                </div>
                <div className="px-1 w-full md:px-0 md:w-1/3">
                  <TimeSelector
                    type="closeTime"
                    changeTime={changeTime}
                    selected={dayWeek[mapindex]?.closeTime}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  openDay(mapindex);
                }}
                className={`${
                  w.isOpen ? "bg-[#D9643A]" : "bg-[#f5f5f5]"
                } w-1/3  mt-4 rounded-full transition-all duration-300 `}
              >
                {w.isOpen ? "Open" : "Closed"}
              </button>
            </li>
          );
        })}
      </ul>
      
    </>
  );

  const closedDaysJsx = (
    <div className=" md:px-[15.5rem]  md:h-full max-h-full text-white pb-2">
      <TeacherCalendar
        setSelectedDate={setSelectedDate}
        closedDays={closedDays}
      />
      <button
        className="text-black font-extrabold bg-[#c5c5c5] px-6 py-0.5 rounded full"
        onClick={() => {
          if (!selectedDate) return;
          if (dayIsClosed) handleOpenDay(selectedDate);
          else if (selectedDate) handleCloseDay(selectedDate);
        }}
      >
        {dayIsClosed ? "Open shop this day" : "Close shop this day"}
      </button>
    </div>
  );

  return (
    <div className="h-full pb-8">
      <div className="flex justify-center  items-center w-1/2 mx-auto mb-2 pt-0 gap-2">
        <p className="text-center text-3xl text-white w-full">
          {!enabled ? "Schedule" : "Closed Days"}
        </p>
        <div className="flex justify-center w-1/2">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-indigo-500" : "bg-gray-200"
            } 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 `}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
      <div className="text-center  ">
        {!enabled ? setWeekDaysJsx : closedDaysJsx}
      </div>
    </div>
  );
}
