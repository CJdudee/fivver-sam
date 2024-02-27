"use client";
import { capitalize } from "@/utils/helpers";
import Link from "next/link";

import React, { useState } from "react";

export default function DisplayTeacher({
  teachersJson,
  teachersWeekJson,
}: any) {
  const [openSch, setOpenSch] = useState<null | number>(null);
  const [dayOpen, setDayOpen] = useState<null | number>(null);
  return (
    <div className="grid grid-cols-1  gap-4 py-4 px-4 h-full  ">
      {teachersJson?.map((t: any, teacherIndex: number) => {
        const { firstName, lastName, email } = t.user;

        const foundSch = teachersWeekJson.find((w: Record<string, unknown>) => {
          return w.teacher == t._id;
        })?.weekdays;

        const teacherWeek = getTeacherSchedule(t, teachersWeekJson);

        console.log(teacherWeek);
        console.log(foundSch, "found week");
        return (
          <div
            key={t._id}
            className="bg-white outline outline-2 outline-[#3D3D3D] w-full md:w-4/5 mx-auto rounded-xl p-2 pt-2 pb-2 drop-shadow-xl  min-h-[12rem] h-full flex flex-col justify-evenly  "
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-xl pr-4">{capitalize(firstName)} {capitalize(lastName)}</p>
              {/* {foundSch != undefined && foundSch.length != 0 && (
                  <span className="text-sm bg-green-500 text-white rounded-full px-2 py-1">
                    Schedule Available
                  </span>
                )} */}
            </div>

            {foundSch != undefined && foundSch.length != 0 && (
              <div className="h-full flex items-center justify-center  font-extrabold">
                <ul
                  className="h-full md:grid grid-cols-2 gap-4 w-4/5  justify-center mt-3 flex-col"
                  style={
                    {
                      //  transform: `translateX(-${tran}dvh)`
                    }
                  }
                >
                  {teacherWeek.map((f: any, weekIndex: number) => {
                    // console.log(f)
                    // {foundSch.map((f: Record<string , unknown>) => {
                    if (f.isOpen == false || f.openTime.length == 0)
                      return (
                        <li
                          className={`${
                            f.isOpen == false && " bg-[#585757] text-white"
                          } rounded-xl w-full px-2 py-1 text-sm flex flex-col  items-center h-fit justify-center `}
                          key={`${f.name} ${f.index}`}
                        >
                          <div className="flex w-full justify-between">
                            <p className="text-lg ">
                              {capitalize(f.name as string)}
                            </p>
                            <p className="text-lg">Closed</p>
                          </div>
                        </li>
                      );

                    return (
                      <li
                        className={`
                        rounded-lg p-4 py-2 bg-gray-100 hover:bg-gray-200
                        ${f.isOpen === false ? "bg-gray-400 text-white" : ""}
                        flex flex-col items-center justify-between w-full overflow-hidden 
                        ${
                          openSch == teacherIndex && dayOpen == weekIndex
                            ? "h-fit"
                            : "h-12"
                        } 
                      `}
                        key={`${f.name} ${f.index}`}
                      >
                        <button
                          className="w-full"
                          onClick={() => {
                            if (
                              teacherIndex == openSch &&
                              dayOpen == weekIndex
                            ) {
                              setOpenSch(null);
                              setDayOpen(null);
                              return;
                            }

                            setOpenSch(teacherIndex);
                            setDayOpen(weekIndex);
                          }}
                        >
                          <div className="flex justify-between w-full ">
                            <p className="font-bold text-lg float-none text-orange-600">
                              {capitalize(f.name as string)}
                            </p>
                            <p className="font-bold text-lg float-right">
                              Open
                            </p>
                          </div>

                          <div className="grid grid-cols-2  mt-4 gap-4">
                            {f.openTime.length > 0 &&
                              f.openTime.map((o: any, i: number) => {
                                return (
                                  <div key={i} className="text-sm my-auto flex ">
                                    <div className="flex justify-center items-center w-full flex-col">

                                    <p>Open:</p>
                                    <p>{o.openTime as string}</p>
                                    </div>
                                    <div className="flex justify-center items-center w-full flex-col">
                                    <p>Close:</p>
                                    <p>{o.closeTime as string}</p>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className=" h-1/6 flex justify-center items-center  my-auto mt-4">
              <Link
                className="font-bold bg-gradient-to-r from-[#D9643A] to-[#E35D5B] px-8 py-0.5 rounded-full text-white hover:text-black "
                href={`/teach/${t._id}`}
              >
                Book
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getTeacherSchedule(teacher: any, teacherWeek: any) {
  return teacherWeek.find((w: Record<string, unknown>) => {
    return w.teacher == teacher._id;
  })?.weekdays;
}
