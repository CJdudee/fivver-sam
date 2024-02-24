"use client";

import { gerFormat } from "@/utils/helpers";
import { formatDate, subYears } from "date-fns";
import React, { useState } from "react";
import SideBarNav from "./SideBarNav";
import { FaHourglass, FaUsers } from "react-icons/fa";
import OldBookingMap from "../../teachers/old/OldBookingMap";
import FlatUserNavBar from "./FlatUserNavBar";

export default function Maindash({ tokens, prevBooking }: any) {
  const [tab, setTab] = useState("");

  const boughtTokens = (
    <div className="mx-auto w-full">
      <p className="text-center text-3xl text-orange-500 font-semibold">Tokens</p>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {tokens.map((p: any, i: number) => (
        <li
          key={i}
          className="card bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <div className="flex flex-col mb-4 items-center">
            <p className="text-lg font-bold mb-2">Purchased On</p>
            <p className="text-2xl font-semibold mb-4">{formatDate(subYears(p.expire, 1), "dd/MM/yy")}</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <FaHourglass className="w-6 h-6 text-gray-400" />
              <p className="text-lg font-bold">Classes:</p>
              <p className="text-xl font-semibold">{p.tokens}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="w-6 h-6 text-gray-400" />
              <p className="text-lg font-bold">Group Size:</p>
              <p className="text-xl font-semibold">{p.groupSize}</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <p className="text-lg font-bold mr-2">Expires:</p>
            <p className="text-xl font-semibold">{gerFormat(p.expire)}</p>
          </div>
        </li>
      ))}
      {tokens.length === 0 && (
        <div className="text-2xl font-semibold w-fit bg-gray-200 px-8 rounded-full py-2 text-center">
          <p>No Tokens have been bought</p>
        </div>
      )}
    </ul>
  </div>
  );

  const prevBookingJsx = (
    <div className="w-full">
      <p className="text-center text-3xl text-orange-500 font-semibold">Previous Classes</p>
      <ul className="mx-auto w-full">
        <div className="md:grid grid-cols-2 flex-col justify-center items-center gap-8 pt-4 w-full ">
          {prevBooking.map((p: any, i: number) => {
            return (
              <OldBookingMap
                key={i}
                userData={p.teacher.user}
                data={p}
                isTeacher={true}
              />
            );
          })}
        </div>

        {prevBooking.length == 0 && (
          <div className="text-3xl font-semibold w-fit  bg-[#ffffff] px-8 rounded-full py-2 text-center mx-auto">
            <p className="">No Previous Bookings</p>
          </div>
        )}
      </ul>
    </div>
  );

  return (
    <>
      {/* <SideBarNav setTab={setTab} tab={tab} /> */}
      <FlatUserNavBar setTab={setTab} tab={tab} />

      <div className="w-full rounded-r-xl py-20 px-2 md:px-8 mx-auto">
        {tab == "" && prevBookingJsx}
        {tab == "token" && boughtTokens}
      </div>
    </>
  );
}
