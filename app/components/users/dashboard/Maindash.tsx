"use client";

import { gerFormat } from "@/utils/helpers";
import { formatDate, subYears } from "date-fns";
import React, { useState } from "react";

export default function Maindash({ tokens, prevBooking }: any) {
  const [tab, setTab] = useState("");

  const boughtTokens = (
    <div className="mx-auto w-full">
      <ul>
        {tokens.map((p: any, i: number) => {
          console.log(p);
          return (
            <li
              className="flex flex-col bg-gray-100 py-8 px-8 rounded-xl w-3/5 min-h-[200px] h-full mx-auto"
              key={i}
            >
              <p className="text-center mb-2 text-2xl font-bold">Bought On {formatDate(subYears(p.expire, 1), 'dd/MM/yy')}</p>
              <div className="flex h-full">
                
                <div className="w-1/2 h-full text-center flex justify-center gap-8 text-2xl font-bold ">
                  <p className="">Tokens:</p>
                  <p className="">{p.tokens}</p>
                </div>

                <div className="w-1/2 h-full text-center flex justify-center gap-8 text-2xl font-bold">
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
        {prevBooking.map((p: any, i: number) => {
          return (
            <li key={i}>
              <p>Hey</p>
            </li>
          );
        })}

        {prevBooking.length == 0 && (
          <div className="text-3xl font-semibold w-fit  bg-gray-300 px-8 rounded-full py-2">
            <p className="">No Previous Bookings</p>
          </div>
        )}
      </ul>
    </div>
  );

  return (
    <>
      <div className="w-1/6 h-full min-h-full bg-gray-200 flex flex-col gap-8 justify-between py-24">
        <button
          onClick={() => setTab("")}
          className=" hover:bg-blue-300 font-extrabold w-full h-full hover:text-white transition-all duration-500"
        >
          Previous Classes
        </button>
        <button
          onClick={() => setTab("token")}
          className=" hover:bg-blue-300 font-extrabold w-full h-full hover:text-white transition-all duration-500"
        >
          Purchase History
        </button>
        <button
          onClick={() => setTab("")}
          className=" hover:bg-blue-300 font-extrabold w-full h-full hover:text-white transition-all duration-500"
        >
          Expired Tokens
        </button>
      </div>

      <div className="w-full rounded-r-xl py-20 px-8 mx-auto">
        {tab == "" && prevBookingJsx}
        {tab == "token" && boughtTokens}
      </div>
    </>
  );
}
