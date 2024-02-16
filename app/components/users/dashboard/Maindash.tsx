"use client";

import { gerFormat } from "@/utils/helpers";
import { formatDate, subYears } from "date-fns";
import React, { useState } from "react";
import SideBarNav from "./SideBarNav";
import { FaHourglass } from "react-icons/fa";
import OldBookingMap from "../../teachers/old/OldBookingMap";

export default function Maindash({ tokens, prevBooking }: any) {
  const [tab, setTab] = useState("");

  const boughtTokens = (
    <div className="mx-auto w-full ">
      <ul className="flex flex-col gap-8">
        {tokens.map((p: any, i: number) => {
          console.log(p);
          return (
            <li
              className="flex flex-col bg-gray-100 py-8 px-8 rounded-xl w-full md:w-3/5 min-h-[200px] h-full mx-auto"
              key={i}
            >
              <div className=" mb-2 flex flex-col md:flex-row justify-center gap-3 items-center">

              <p className=" text-center text-2xl font-bold">Purchased On</p>
              <p className=" text-center text-2xl font-bold">{formatDate(subYears(p.expire, 1), 'dd/MM/yy')}</p>
              </div>
              <div className="flex flex-col md:flex-row h-full mx-auto w-full justify-center items-center">
                
                <div className="md:w-1/2 h-full text-center flex justify-center gap-2 text-2xl font-bold items-center ">
                <FaHourglass className="w-7 h-7 text-gray-600" />
                  <p className="">Tokens:</p>
                  <p className="">{p.tokens}</p>
                </div>

                <div className="md:w-1/2 h-full text-center flex justify-center gap-2 text-2xl font-bold">
                  <p className="">Group Size:</p>
                  <p className="">{p.groupSize}</p>
                </div>
              </div>
              <div className="text-center mt-4 text-2xl font-bold">
                <p>Expires</p>
                <p>{gerFormat(p.expire)}</p>
                
              </div>
            </li>
          );
        })}
        {tokens.length == 0 && (
          <div className="text-3xl font-semibold w-fit  bg-gray-300 px-8 rounded-full py-2">
            <p className="">No Tokens have been bought</p>
          </div>
        )}
      </ul>
    </div>
  );

  const prevBookingJsx = (
    <div className="w-full">
      <ul className="mx-auto w-full">
      <div className="flex flex-col justify-center items-center gap-8 pt-8 px-2">
      {prevBooking.map((p: any, i: number) => {
          return (
            <OldBookingMap key={i} userData={p.teacher.user} data={p} isTeacher={true} />
          );
        })}
      </div>
        

        {prevBooking.length == 0 && (
          <div className="text-3xl font-semibold w-fit  bg-gray-300 px-8 rounded-full py-2 text-center mx-auto">
            <p className="">No Previous Bookings</p>
          </div>
        )}
      </ul>
    </div>
  );

  return (
    <>
      <SideBarNav setTab={setTab} tab={tab} />

      <div className="w-full rounded-r-xl py-20 px-8 mx-auto">
        {tab == "" && prevBookingJsx}
        {tab == "token" && boughtTokens}
      </div>
    </>
  );
}
