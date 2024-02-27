"use client";
import { markMonthlyOrder } from "@/actions/monthlyOrder";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize } from "@/utils/helpers";
import { addMonths, formatDate, parse, subMonths } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { CgArrowDown, CgArrowLeft, CgArrowRight } from "react-icons/cg";
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
  const [monthly, setMonthly] = useState(foundMonthJson);
  const [tab, setTab] = useState("");
  const [date, setDate] = useState(format);

  const todaySplit = format.split("/");

  console.log(todaySplit, Number(todaySplit[0]), Number(todaySplit[1]));

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

  const monthFilter = monthly.filter((f: any) => {
    if (date == f.date) return true;

    return false;
  });

  const handlePaidMonth = async (monthId: string, index: number) => {
    if (!monthId) return;

    const marked = await markMonthlyOrder(monthId);

    if (!marked) return errorToast();

    const monthCopy = [...monthly];

    const foundIndex = monthCopy.findIndex((m: any) => m._id === monthId);

    console.log(monthCopy, foundIndex);

    monthCopy[foundIndex] = marked.data;

    console.log(monthCopy, "you");

    setMonthly(monthCopy);

    susToast(marked.msg);
  };

  console.log(monthly);

  const allTeachersJsx = (
    <>
      <p className={`text-2xl mt-4 text-white`}>All Teachers</p>
      <div className=" flex flex-col gap-4 xl:grid grid-cols-2 mt-2">
        {teacherJson.map((t: any, i: number) => (
          <div key={t._id} className="rounded-md p-4 shadow-md bg-white text-black">
            <div className="flex flex-col justify-between items-center">
              <div className="mb-2">
                <p className="text-black font-bold">Name:</p>
                <p className="text-xl font-semibold">{capitalize(t.user.firstName)}</p>
              </div>
              <div className="md:flex justify-evenly w-full md:ml-8 font-semibold">
                <div>
                  <p>Total orders</p>
                  <p>{t.orders}</p>
                </div>
                <div>
                  <p>Current orders</p>
                  <p>{t.currentOrders}</p>
                </div>
                <div>
                  <p>Canceled Orders</p>
                  <p>{t.canceledOrders}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <Link
                href={`/dashboard/viewteachers/${t._id}`}
                className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] text-white hover:text-black px-4 py-2 rounded-md font-bold"
              >
                View Teacher
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const monthTeachersJsx = (
    <>
      <p className={`text-2xl mt-4 `}>Month {date}:</p>
      <div className="flex justify-evenly items-center mt-4">
        <button
          className="hover:text-gray-300 transition-all duration-500"
          onClick={() => handleDateChange("sub")}
        >
          {" "}
          <CgArrowLeft className="h-7 w-7" />
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
          <CgArrowRight className="h-7 w-7" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {teacherJson.map((t: any, i: number) => {
          const found = monthFilter.find((f: any) => f.teacher == t._id);

          const dateSplit = found?.date.split("/");

          console.log(found, dateSplit, "yoy o");

          if (!found) return;

          const isPast =
            Number(dateSplit[1]) < Number(todaySplit[1]) ||
            (Number(dateSplit[1]) < Number(todaySplit[1]) &&
              Number(dateSplit[0]) < Number(todaySplit[0]));

          console.log(isPast);

          return (
            <div
              key={t._id}
              className="bg-white text-black rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-bold">
                  {capitalize(t.user.firstName)}
                </p>
                {isPast && (
                  <button
                    className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] text-white hover:text-black font-bold px-4 py-2 rounded-md focus:outline-none shadow-md"
                    onClick={() => handlePaidMonth(found._id, i)}
                  >
                    {found.paid ? "Paid" : "Not Paid"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">This Month Orders:</p>
                  <p>{found.orders}</p>
                </div>
                <div>
                  <p className="font-bold">Canceled Orders:</p>
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
