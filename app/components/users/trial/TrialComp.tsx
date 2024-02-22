"use client";

import { capitalize } from "@/utils/helpers";
import React, { useState } from "react";

const initWeekDay = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const weekDayArray = [
  { name: "monday" },
  { name: "tuesday" },
  { name: "wednesday" },
  { name: "thursday" },
  { name: "friday" },
  { name: "saturday" },
  { name: "sunday" },
];

export default function TrialComp() {
  const [weekDayState, setWeekDayState] = useState<any>(initWeekDay);

  const [descDay, setDescDay] = useState("");

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-white text-xl md:text-3xl w-full md:w-1/2 text-center mb-8 font-semibold  px-2">
        This is All the infomation we need to begin to process your trial.
        Please make sure to use a vaild email so we can contact you if needed
      </p>

      <div className=" text-white w-full md:w-2/3 text-center mt-4 py-4 pb-8 rounded-xl">
        {/* <p className="font-semibold text-2xl">Info</p> */}

        <div className="flex justify-evenly mb-2 gap-4 px-4">
          <div className="flex flex-col text-white w-full md:w-1/4 ">
            <label className="text-2xl font-bold" htmlFor="firstName">
              First Name
            </label>
            <input
              className="rounded-full pl-2 text-black w-full py-0.5"
              id="firstName"
            ></input>
          </div>
          <div className="flex flex-col text-white w-full md:w-1/4 ">
            <label className="text-2xl font-bold" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="rounded-full pl-2 text-black w-full py-0.5"
              id="lastName"
            ></input>
          </div>
        </div>
        <div className="flex flex-col text-white w-4/5 md:w-2/4 mx-auto">
          <label className="text-2xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-full pl-2 text-black w-full py-0.5"
            id="email"
          ></input>
        </div>
      </div>

      <div className=" text-white w-full md:w-2/3 text-center mt-4 py-4 pb-8 rounded-xl">
        <p className="font-semibold mb-4 text-2xl">
          Please Choose days that fit your schdule
        </p>
        <ul className="grid grid-cols-2 gap-4">
          {weekDayArray.map((w: any, i: number) => {
            return (
              <li
                className="flex mx-auto gap-4 items-center underline underline-offset-4"
                key={i}
              >
                <p className="text-xl font-bold">{capitalize(w.name)}</p>
                <input
                  className="mt-1"
                  onChange={() => {
                    const result = !weekDayState[w.name];

                    console.log(result);

                    setWeekDayState((prev: any) => {
                      console.log(prev);
                      return { ...prev, [w.name]: result };
                    });
                  }}
                  type="checkbox"
                  checked={weekDayState[w.name]}
                ></input>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4  mx-auto  w-full md:w-2/3 py-4 rounded-xl">
        <p className="text-2xl text-white font-bold text-center">
          Please explain further, Times that you are available
        </p>

        <div className="flex flex-col md:flex-row gap-0 md:gap-2 items-center justify-center mt-1 mx-auto mb-4 md:mb-2 w-full">
          <p className="text-sm text-white font-bold  flex justify-center items-center ">
            For example
          </p>

          <q className="text-xs text-white font-bold  flex justify-center items-center text-center ">
            I am free in the morning and wednesdays evenings
          </q>
        </div>
        <p className="text-sm text-white font-semibold mb-1 flex justify-center items-center">
          This will help us book you classes
        </p>
        <textarea
          value={descDay}
          onChange={(e) => setDescDay(e.target.value)}
          className="w-3/4 mx-auto flex rounded-xl px-2 py-1 font-semibold h-[200px] resize-none"
        ></textarea>
      </div>
    </div>
  );
}
