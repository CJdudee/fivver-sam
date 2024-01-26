"use client";

import { weedayIndexToName } from "@/utils/helpers";
import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import TimeSelector from "./TimeSelector";
import { closeTheDay, openTheDay, updateWorkDays } from "@/actions/updateWorkDay";
import TeacherCalendar from "./TeacherCalendar";

export default function TeacherSchedule({ weekDays, id, teacherId, daysClosed }: any) {
  const [enabled, setEnabled] = useState(false);

  const [dayWeek, setDayWeek] = useState(weekDays);
  const [ closedDays, setClosedDays ]  = useState(daysClosed ?? [])
  const [selectedDate, setSelectedDate ] = useState<Date | null>()
  const [ dayIsClosed, setDayIsClosed] = useState(false)

console.log(closedDays)
  useEffect(() => {
    if(!selectedDate && !closedDays) return 

    //this is for the date that is returned and set from the calendar which doesn't match if the date isn't a string so the date has to be turned into a string //refactoring is very needed for this
    let closedDaysArray: any[] = []
    closedDays.map((c: any) => {if ( c.date == `${selectedDate?.toISOString()}`) closedDaysArray.push(c.date); else console.log(c.date == `${selectedDate?.toISOString()}`)})

    // console.log(( selectedDate ), closedDays, 'hellow')
    // async function workplz() {
    if (closedDaysArray.length) {

    
    
      setDayIsClosed(true)
      closedDaysArray = []
    } else {
      setDayIsClosed(false)
      closedDaysArray = []
      

    }
      
      

  }, [selectedDate])

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

  const handleSumbit = async () => {
    await updateWorkDays(id, dayWeek);
  };

  const handleCloseDay = async (date: Date) => {
    const closedDate = await closeTheDay(date, teacherId)

    console.log(closedDate, 'yoyu yo')
    const dateCopy = [...closedDays]

    dateCopy.push(closedDate)
    setClosedDays(dateCopy)
  }
  const handleOpenDay = async (date: Date) => {
    const openDay = await openTheDay(date, teacherId)

    let  dateCopy = [...closedDays]

    dateCopy = dateCopy.filter((d) => d._id != openDay._id)

    // console.log(openDay)
    setClosedDays(dateCopy)
  }

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
      <ul className="text-center h-full flex flex-col justify-between items-center w-full text-black font-bold font-mono text-xl gap-8  px-24">
        {dayWeek.map((w: any, mapindex: number) => {
          const changeTime = _changeTime(w);

          return (
            <li className="h-full w-full bg-slate-400 rounded" key={w.name}>
              <p>{w.name}</p>
              <div className="flex w-full justify-evenly">
                <div className="w-1/2">
                  <TimeSelector
                    type="openTime"
                    changeTime={changeTime}
                    selected={dayWeek[mapindex]?.openTime}
                  />
                </div>
                <div className="w-1/2">
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
                className="w-full bg-blue-400 "
              >
                {w.isOpen ? "Open" : "Closed"}
              </button>
            </li>
          );
        })}
      </ul>
      <button className="text-center text-white" onClick={handleSumbit}>
        Save
      </button>
    </>
  );

  const closedDaysJsx = (
  <div className=" bg-indigo-950 px-8 py-6 text-white">
  <TeacherCalendar setSelectedDate={setSelectedDate} closedDays={closedDays} />
  <button className="text-white" onClick={() => {
    if(!selectedDate) return 
    if(dayIsClosed) handleOpenDay(selectedDate)
    else if (selectedDate) handleCloseDay(selectedDate)
  }}>{dayIsClosed ? 'Open shop this day' : 'Close shop this day'}</button>
  </div>
  );

  return (
    <div className="h-full">
      <div className="flex justify-center  items-center w-1/2 mx-auto mb-4 mt-4">
        <p className="text-center text-3xl text-white w-1/2">
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
      <div className="text-center">
        {!enabled ? setWeekDaysJsx : closedDaysJsx}
      </div>
    </div>
  );
}
