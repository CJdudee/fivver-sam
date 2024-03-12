"use client";
import { capitalize, gerFormat } from "@/utils/helpers";
import { formatDate } from "date-fns";
import { Bebas_Neue } from "next/font/google";
import React, { useMemo, useState } from "react";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function AllBooking({
  booked,
  bookingLength,
  onCancelBook,
}: any) {
  const originArray = [...booked];
  // const reverseArray = useMemo(() => originArray.reverse(), [originArray]);
  const reverseArray = originArray.reverse();
  console.log(originArray, "what waht");
  const [filterBooked, setFilterBooked] = useState(reverseArray);
  const [closest, setClosest] = useState(false);

  const [status, setStatus] = useState("");

  // const originArray = useMemo(() => {
  //   return [...booked];
  // }, [booked]);

  const changeDir = () => {
    if (!closest) {
      setFilterBooked(booked);
      setClosest(!closest);
    } else {
      setFilterBooked(reverseArray);
      setClosest(!closest);
    }
  };

  const filteredArray = filterBooked.filter((f) => {
    if (status == "") return true;

    return f.status == status;
  });

  return (
    <>
      <p
        className={` ${bebas.className} text-center text-white text-3xl font-semibold`}
      >
        Total bookings: {bookingLength}
      </p>
      <div className="text-center text-white flex justify-between items-center px-10">
        <button
          className="font-bold px-8 py-2 bg-purple-600 rounded-full hover:bg-purple-800 active:bg-purple-900"
          onClick={changeDir}
          // onClick={() => setClosest(!closest)}
        >
          {!closest ? "Show most recent bookings" : "Show latest bookings"}
        </button>
        <select
          id="daysAway"
          className="text-white  bg-transparent outline rounded-xl pl-3 py-2 text-center"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option className="text-black" value="">
            All
          </option>
          <option className="text-black" value="pending">
            Completed
          </option>
          <option className="text-black" value="canceled">
            Canceled
          </option>
          
        </select>
      </div>
      <div className="flex flex-col gap-4 md:grid grid-cols-2 px-4">
        {/* {(closest ? booked : reverseArray).map((b: any) => { */}
        {filteredArray.map((b: any) => {
          const time = new Date(b.date);

          const isDayOver = time < new Date();

          const formated = gerFormat(time);

          const split = b.time.split(":");

          const sHour = split[0];
          const sMin = split[1];

          let numb = null;

          if (Number(sHour) > 12) {
            numb = sHour % 12;
          }

          // console.log(b.status);
          // console.log(split)

          // console.log(b.time)
          // console.log(formatted, formattedDay, "yo yo what");

          return (
            <div
              key={b._id}
              className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full h-fit  mx-auto"
            >
              <div className="flex items-center justify-between md:w-2/3 gap-8 mb-4 w-full px-2 md:px-0 mx-auto">
                <h3 className="text-xl font-bold">{formated}</h3>
                <p className="text-xl font-bold">
                  {split[0]}:{split[1]}{" "}
                </p>
              </div>
              <div className="border-b border-gray-200 py-4">
                <div className="flex justify-center gap-8 items-center">
                  <p className="text-lg font-medium">Student:</p>
                  <p className="text-lg font-medium">
                    {capitalize(b.student.firstName)}
                  </p>
                </div>
                <div className="flex justify-center gap-8 items-center">
                  <p className="text-lg font-medium">Email:</p>
                  <p className="text-lg font-medium truncate">
                    {b.student.email || "No Email"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center h-full mt-4">
                <p className="text-lg font-medium text-black">Status:</p>
                {/* <p>{b.status}</p> */}
                <p
                  className={`ml-2 text-black font-bold ${
                    isDayOver && b.status === "pending" ? "text-gray-600" : ""
                  }`}
                >
                  {isDayOver && b.status === "pending" && "Completed"}
                  {isDayOver && b.status === "canceled" && "Canceled"}
                  {!isDayOver && capitalize(b.status || "Completed")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// const formatted = b.date.toISOString()
// const formatted = time.getMonth();
// const formattedDay = time.getDate();
// const formattedYear = time.getFullYear();
// const formattedHour = time.getHours()
// const formattedMin = time.getMinutes()

// const numb = timeConvert()

// <div className="flex justify-center mt-4">
//             <button
//               className={`btn btn-primary ${isDayOver ? 'disabled:opacity-50' : ''}`}
//               onClick={() => onCancelBook(b._id)}
//               disabled={isDayOver}
//             >
//               Cancel
//             </button>
//           </div>
