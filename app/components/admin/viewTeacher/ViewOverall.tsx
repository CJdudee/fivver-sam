"use client";
import { capitalize } from "@/utils/helpers";
import { addMonths, formatDate, parse, subMonths } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { CgArrowDown } from "react-icons/cg";
import { IoArrowDownSharp } from "react-icons/io5";
import {
  LuArrowLeft,
  LuArrowLeftSquare,
  LuArrowRightSquare,
} from "react-icons/lu";

export default function ViewOverall({
  teacherJson,
  foundMonthJson,
  format,
}: any) {
  const [tab, setTab] = useState("");
  const [date, setDate] = useState(format);

  const handleDateChange = (type: string) => {
    if (type == "sub") {
      const parsed = parse(date, "MM/yy", new Date());

      const sub = subMonths(parsed, 1);

      const newFormat = formatDate(sub, "MM/yy");

      //   console.log(newFormat);
      setDate(newFormat);
    }
    if (type == "add") {
      const parsed = parse(date, "MM/yy", new Date());

      const sub = addMonths(parsed, 1);

      const newFormat = formatDate(sub, "MM/yy");

      //   console.log(newFormat);
      setDate(newFormat);
    }
    if (type == "today") {
      const newFormat = formatDate(new Date(), "MM/yy");

      //   console.log(newFormat);
      setDate(newFormat);
    }
  };

  const monthFilter = foundMonthJson.filter((f: any) => {
    if (date == f.date) return true;

    return false;
  });

  const allTeachersJsx = (
    <>
      <p className={`text-2xl mt-4 `}>All Teachers:</p>
      <div className="xl:grid grid-cols-2 gap-2">
        {teacherJson.map((t: any, i: number) => {
          return (
            <div
              key={t._id}
              className="w-full text-xl mt-4 outline outline-1 outline-black py-4 px-2 rounded-xl"
            >
              <div className="flex mb-2 text-2xl font-extrabold justify-center gap-2 pb-2">
                <p className="">Name:</p>
                <p className="">{capitalize(t.user.username)}</p>
              </div>
              <div className="md:flex justify-evenly text-2xl font-bold">
                <div>
                  <p>Total orders </p>
                  <p>{t.orders}</p>
                </div>
                <div>
                  <p>Current orders</p>

                  <p>{t.currentOrders}</p>
                </div>
                <div>
                  <p>CanceledOrders</p>
                  <p>{t.canceledOrders}</p>
                </div>
              </div>
              <div className="mt-4">

              <Link href={`/dashboard/viewteachers/${t._id}`} className="mt-4 px-8  outline outline-1 rounded-full w-1/2">View Teacher</Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const monthTeachersJsx = (
    <>
      <p className={`text-2xl mt-4 `}>Month {date}:</p>
      <div className="w-11/12 md:w-2/3 flex justify-evenly mx-auto mt-4">
        <button
          className="hover:text-gray-300 transition-all duration-500"
          onClick={() => handleDateChange("sub")}
        >
          {" "}
          <LuArrowLeftSquare className="h-7 w-7" />
        </button>
        <button
          className="hover:text-gray-300 transition-all duration-500"
          onClick={() => handleDateChange("today")}
        >
          {" "}
          <IoArrowDownSharp className="h-7 w-7" />
        </button>
        <button
          className="hover:text-gray-300 transition-all duration-500"
          onClick={() => handleDateChange("add")}
        >
          {" "}
          <LuArrowRightSquare className="h-7 w-7" />
        </button>
      </div>
      <div className="xl:grid grid-cols-2 gap-2">
        {teacherJson.map((t: any, i: number) => {
          const found = monthFilter.find((f: any) => f.teacher == t._id);

          console.log(found);

          if (!found) return;

          return (
            <div
              key={t._id}
              className="w-full text-xl mt-4 outline outline-1 outline-black py-4 px-2 rounded-xl"
            >
              <div className="flex mb-2 text-2xl font-extrabold justify-center gap-2 pb-2">
                <p className="">Name:</p>
                <p className="">{capitalize(t.user.username)}</p>
              </div>
              <div className="md:flex justify-evenly text-2xl font-bold">
                <div>
                  <p>This Month Orders </p>
                  <p>{found.orders}</p>
                </div>
                {/* <div>
                  <p>Completed orders</p>

                  <p>{found.orders - found.canceledOrders}</p>
                </div> */}
                <div>
                  <p>Canceled Orders</p>
                  <p>{found.canceledOrders}</p>
                </div>
              </div>
            </div>
          );
        })}
        
      </div>

      {monthFilter.length == 0 && (
          <div className="text-center w-full h-full flex justify-center items-center py-24 text-4xl">
            <p>No Teachers Orders this Month</p>
          </div>
        )}
    </>
  );

  return (
    <>
      <div className="justify-evenly flex text-3xl ">
        <button
          className={`${tab == "" && "underline"}`}
          onClick={() => setTab("")}
        >
          All Teachers
        </button>
        <button
          className={`${tab == "month" && "underline"}`}
          onClick={() => setTab("month")}
        >
          Monthly Orders
        </button>
      </div>
      {tab == "" && allTeachersJsx}
      {tab == "month" && monthTeachersJsx}
    </>
  );
}
