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
import WeekSchedule from "./weekDay/WeekSchedule";

const initWeekDays = [
  {
    index: 0,
    name: "sunday",
    openTime: [],
    closeTime: "10 : 30",
    isOpen: true,
  },

  {
    index: 1,
    name: "monday",
    openTime: [],
    closeTime: "22:00",
    isOpen: true,
  },

  {
    index: 2,
    name: "tuesday",
    openTime: [],
    closeTime: "22:00",
    isOpen: true,
  },
  {
    index: 3,
    name: "wednesday",
    openTime: [],
    closeTime: "22:00",
    isOpen: false,
  },
  {
    index: 4,
    name: "thursday",
    openTime: [],
    closeTime: "22:00",
    isOpen: false,
  },
  {
    index: 5,
    name: "friday",
    openTime: [],
    closeTime: "22:00",
    isOpen: false,
  },
  {
    index: 6,
    name: "saturday",
    openTime: [],
    closeTime: "22:00",
    isOpen: true,
  },
];

export default function TeacherSchedule({
  weekDays,
  id,
  teacherId,
  daysClosed,
}: any) {
  const [enabled, setEnabled] = useState(false);

  // const [dayWeek, setDayWeek] = useState<any>(initWeekDays);
  const [dayWeek, setDayWeek] = useState(weekDays);
  const [closedDays, setClosedDays] = useState(daysClosed ?? []);
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [dayIsClosed, setDayIsClosed] = useState(false);

  const [openingTime, setOpeningTime] = useState<any>({
    openTime: undefined,
    closeTime: undefined,
    index: undefined,
  });

  // console.log(closedDays);
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

    if (!saved) return errorToast();

    weekDays = dayWeek;
    return susToast(saved.msg);
  };

  const handleCloseDay = async (date: Date) => {
    const closedDate = await closeTheDay(date, teacherId);

    if (!closedDate) return errorToast();

    // console.log(closedDate, "yoyu yo");
    const dateCopy = [...closedDays];

    dateCopy.push(closedDate.data);
    setClosedDays(dateCopy);

    susToast(closedDate.msg);
  };
  const handleOpenDay = async (date: Date) => {
    const openDay = await openTheDay(date, teacherId);

    if (!openDay) return errorToast();

    let dateCopy = [...closedDays];

    dateCopy = dateCopy.filter((d) => d._id != openDay.data._id);

    // console.log(openDay)
    setClosedDays(dateCopy);

    susToast(openDay.msg);
  };

  function _changeTime(day: any) {
    return function (
      time: string,
      type: "openTime" | "closeTime",
      index: number,
      arrayIndex: number
    ) {
      // const index = dayWeek.findIndex(
      //   (x: any) => x.name === weedayIndexToName(day.index)
      // );
      // const newOpeningHrs: any = [...dayWeek];
      // newOpeningHrs[index]?.openTime.push({ [type]: time });
      // console.log(newOpeningHrs);

      if (!time) return;

      if (index != openingTime.index) {
        if (type == "openTime") {
          setOpeningTime({ openTime: time, closeTime: undefined, index });
          return;
        } else {
          setOpeningTime({ openTime: undefined, closeTime: time, index });
          return;
        }
      }

      console.log(arrayIndex);

      if (typeof arrayIndex == "number") {
        console.log("hit");

        const arrayState = dayWeek[index]?.openTime.map((a: any, i: number) => {
          if (i === arrayIndex) {
            return {
              // openTime: openingTime.openTime,
              // closeingTime: openingTime.closeTime,
              ...a,
              [type]: time,
            };
          } else {
            return a;
          }
        });

        return setDayWeek((prev: any) => {
          const state = prev.map((p: any, i: number) => {
            if (i == index) {
              return {
                ...p,
                openTime: arrayState,
              };
            } else {
              return p;
            }
          });

          return state;
        });
        // return setDayWeek(arrayState);
      }

      setOpeningTime((prev: any) => {
        return { ...prev, [type]: time, index };
      });
      console.log(openingTime);
      // setDayWeek(newOpeningHrs);
    };
  }
  // function _changeTime(day: any) {
  //   return function (time: string, type: "openTime" | "closeTime") {
  //     const index = dayWeek.findIndex(
  //       (x: any) => x.name === weedayIndexToName(day.index)
  //     );
  //     const newOpeningHrs: any = [...dayWeek];
  //     newOpeningHrs[index]?.openTime.push({ [type]: time });
  //     console.log(newOpeningHrs);
  //     // setDayWeek(newOpeningHrs);
  //   };
  // }

  function saveTime(day: any) {
    return function (
      time: string,
      type: "openTime" | "closeTime",
      num?: number
    ) {
      const index = dayWeek.findIndex(
        (x: any) => x.name === weedayIndexToName(day.index)
      );

      if (!openingTime.closeTime || !openingTime.openTime) return;

      if (!num) {
        const state = [...dayWeek];
        // Add new time slot
        state[index]?.openTime.push({
          openTime: openingTime.openTime,
          closeTime: openingTime.closeTime,
        });

        setDayWeek(state);
        setOpeningTime({
          openTime: undefined,
          closeTime: undefined,
          index: undefined,
        });
      } else {
        // Update existing time slot
        const dayState = dayWeek[index]?.openTime.map((c: any, i: number) => {
          if (i === num) {
            return {
              openTime: openingTime.openTime,
              closeTime: openingTime.closeTime,
            };
          } else {
            return c;
          }
        });
        setDayWeek(dayState);
        return;
      }
    };
  }

  function deleteTime(day: any) {
    return function (num: number) {
      const index = dayWeek.findIndex(
        (x: any) => x.name === weedayIndexToName(day.index)
      );

      // if (num == 100) return;

      if (typeof num != 'number') return 

      let state = [...dayWeek]

      console.log(index)
      console.log(num)

         state[index].openTime = state[index]?.openTime.filter((c: any, i: number) => {
        if (i === num) {
          return false ;
        } else {
          return true;
        }
      });

      console.log(state)
      setDayWeek(state);
    };
  }
  // function _changeTime(day: any) {
  //   return function (time: string, type: "openTime" | "closeTime") {
  //     const index = dayWeek.findIndex(
  //       (x: any) => x.name === weedayIndexToName(day.index)
  //     );
  //     const newOpeningHrs: any = [...dayWeek];
  //     newOpeningHrs[index]?.openTime.push({[type]: [time]}) ;
  //     console.log(newOpeningHrs);
  //     setDayWeek(newOpeningHrs);
  //   };
  // }

  console.log(dayWeek);

  function openDay(index: number) {
    const copy = [...dayWeek];

    copy[index].isOpen = !copy[index].isOpen;

    setDayWeek(copy);
  }

  const setWeekDaysJsx = (
    <>
      {weekDays != dayWeek && (
        <button
          className="text-center text-white mt-2 mb-4 font-bold outline outline-1 px-8 py-0.5 rounded-full w-1/3 hover:text-gray-400 hover:outline-white "
          onClick={handleSavingWeek}
        >
          Save
        </button>
      )}
      <WeekSchedule
        openDay={openDay}
        dayWeek={dayWeek}
        _changeTime={_changeTime}
        saveTime={saveTime}
        openingTime={openingTime}
        setOpeningTime={setOpeningTime}
        deleteTime={deleteTime}
      />
    </>
  );

  const closedDaysJsx = (
    <div className=" md:px-[15.5rem]  md:h-full max-h-full text-white pb-2">
      <TeacherCalendar
        setSelectedDate={setSelectedDate}
        closedDays={closedDays}
      />
      <button
        className="text-black font-extrabold bg-white hover:text-gray-600 px-6 py-0.5 rounded-full"
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
        <div className="flex justify-center w-1/2  ">
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
