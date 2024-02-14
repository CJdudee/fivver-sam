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

  const [descDay, setDescDay] = useState('')

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-white text-xl w-full md:w-1/2 text-center mb-8 font-semibold underline">
        This is All the infomation we need to begin to process your trial.
        Please make sure to use a vaild email so we can contact you if needed
      </p>

      <div className="w-full">
        <div className="flex flex-col text-white w-1/4 mx-auto">
          <label className="text-2xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-full pl-2 text-black w-full py-0.5"
            id="email"
          ></input>
        </div>
        <div className="flex justify-evenly mt-2">
          <div className="flex flex-col text-white w-1/4 ">
            <label className="text-2xl font-bold" htmlFor="firstName">
              First Name
            </label>
            <input
              className="rounded-full pl-2 text-black w-full py-0.5"
              id="firstName"
            ></input>
          </div>
          <div className="flex flex-col text-white w-1/4 ">
            <label className="text-2xl font-bold" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="rounded-full pl-2 text-black w-full py-0.5"
              id="lastName"
            ></input>
          </div>
        </div>
      </div>

      <div className="bg-gray-950 text-white w-2/3 text-center mt-4 py-4 pb-8 rounded-xl">
        <p className="font-semibold mb-2">
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

      <div className="mt-4  mx-auto bg-gray-950 w-2/3 py-4 rounded-xl">
        <p className="text-2xl text-white font-bold text-center">
          Please explain further, Times that you are able
        </p>
        <div className="flex gap-2 items-center justify-center mt-1 mx-auto mb-2">
          <p className="text-sm text-white font-bold  flex justify-center items-center ">
            For example
          </p>

          <q className="text-sm text-white font-bold  flex justify-center items-center ">
            On Saturdays, I am free in the morning and wednesdays evenings
          </q>
        </div>

        <textarea value={descDay} onChange={(e) => setDescDay(e.target.value)} className="w-3/4 mx-auto flex rounded-xl px-2 py-1 font-semibold h-[200px] resize-none"></textarea>
      </div>
    </div>
  );
}
