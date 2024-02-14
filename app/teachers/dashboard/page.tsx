import { roleChecker } from "@/app/lib/roleCheck";
import { serverUser } from "@/app/lib/serverAuth";
import Booking from "@/models/Booking";
import Teacher from "@/models/Teacher";
import { simpleJson } from "@/utils/helpers";
import { formatDate } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FcSettings } from "react-icons/fc";
import MonthlyOrder from "@/models/MonthlyOrder";
import { decodeUserAndCheckTeacher } from "@/app/lib/finallyRoleCheck";

export default async function Page() {
  const user = await serverUser();
  if (!user) redirect("/");

  await decodeUserAndCheckTeacher();

  const teacher = await Teacher.findOne({ user: user.id });

  console.log(teacher, user);

  const format = formatDate(new Date(), "MM/yy");

  const mothnlyOrder = await MonthlyOrder.findOne({
    teacher: teacher._id,
    date: format,
  });
  console.log(mothnlyOrder);

  // console.log(format, typeof format);
  // roleChecker(user, ["teacher"]);

  const canBooking = await Booking.find({
    teacher: teacher._id,
    status: "cancel",
  }).countDocuments();
  const currentBooking = await Booking.find({
    teacher: teacher._id,
    status: "pending",
    date: {
      $gt: new Date(),
    },
  }).countDocuments();
  // const canBooking = await Booking.find({teacher: teacher._id, date: {
  //   $gte: new Date()
  // }}).countDocuments()

  const teacherJson = simpleJson(teacher);

  const bookingJson = simpleJson(canBooking);
  const currentJson = simpleJson(currentBooking);

  const monthlyOrderJson = simpleJson(mothnlyOrder);

  // console.log(teacherJson);
  // console.log(currentJson);

  const monthlyJsx = (
    <div className="flex  items-center flex-row text-black  gap-8 py-10 px-4 md:p-10 w-full md:w-full rounded-t-xl justify-evenly h-full min-h-[80px]">
      <div className="flex justify-center items-center md:text-2xl font-bold w-1/3  md:border-r-2 h-full ">
        <p className="w-full flex justify-center items-center ">
          This Month Orders
        </p>{" "}
        <p className="w-full flex justify-center items-center ">
          {monthlyOrderJson?.orders}
        </p>
      </div>
      <div className="flex justify-center items-center md:text-2xl font-bold w-1/3  md:border-r-2">
        <p className="w-full flex justify-center ">Completed Orders</p>
        <p className="w-full flex justify-center ">
          {monthlyOrderJson?.completedOrders}
        </p>
        {/* <p className="w-full flex justify-center ">{teacherJson.currentOrders}</p> */}
      </div>
      {/* <div className="flex justify-center items-center md:text-2xl font-bold w-1/3">
        <p className="w-1/2 flex justify-center ">Cancel Orders</p>
        {/* <p className="w-1/2 flex justify-center ">{teacherJson.canceledOrders}</p> */}
      {/* <p className="w-1/2 flex justify-center ">
          {monthlyOrderJson?.canceledOrders}
        </p>
      </div> */}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 justify-evenly w-full items-center md:p-24 pt-4  relative min-h-[600px] h-screen ">
      <div className=" absolute top-8 right-4 md:right-28">
        {/* <FcSettings className="w-10 h-10 hover:rotate-90 transition-all duratino-500" /> */}
        <Link
          href={"/profile"}
          className="outline outline-white outline-[.5px] px-6 py-2 rounded-full text-black md:text-[#c5c5c5] hover:text-[#838383]"
        >
          Profile
        </Link>
      </div>
      {/* <div className="">
        <p>These Month Orders</p>
        <div>
          {monthlyOrderJson ? (
            <div></div>
          ) : (
            <div>
              <p>No orders </p>
            </div>
          )}
        </div>
      </div> */}
      <div className="flex flex-col justify-between w-full items-center  pt-4 bg-[#e6e6e6] mt-0 rounded-xl min-h-full h-full ">
        <p className="text-2xl text-center text-gray-800 font-extrabold">
          {" "}
          {format} Orders
        </p>

        <div className="w-full">
          {monthlyOrderJson && monthlyJsx}
          {!monthlyOrderJson && (
            <div className="text-3xl text-center font-bold mt-2">
              <p>No Orders This Month</p>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="flex  items-center flex-row text-black  gap-8 py-10 px-4 md:p-10 w-full md:w-full rounded-t-xl justify-evenly">
            <div className="flex justify-center items-center md:text-2xl font-bold w-1/3  md:border-r-2">
              <p className="w-full flex justify-center ">Total Orders</p>{" "}
              <p className="w-full flex justify-center ">
                {teacherJson.orders}
              </p>
            </div>
            <div className="flex justify-center items-center md:text-2xl font-bold w-1/3  md:border-r-2">
              <p className="w-full flex justify-center ">Current Orders</p>
              <p className="w-full flex justify-center ">{currentJson}</p>
              {/* <p className="w-full flex justify-center ">{teacherJson.currentOrders}</p> */}
            </div>
            <div className="flex justify-center items-center md:text-2xl font-bold w-1/3">
              <p className="w-1/2 flex justify-center ">Cancel Orders</p>
              {/* <p className="w-1/2 flex justify-center ">{teacherJson.canceledOrders}</p> */}
              <p className="w-1/2 flex justify-center ">
                {teacherJson.canceledOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-end w-full h-1/4">
          <div className="w-full flex items-center justify-center ">
            <Link
              className=" hover:bg-gray-200 font-semibold  p-4 h-full w-full  text-center min-h-max text-3xl border-t-2 border-r-2 border-black flex items-center justify-center"
              href={"/teachers/dashboard/schedule"}
            >
              Make Schedule
            </Link>
            <Link
              className=" hover:bg-gray-200 font-semibold rounded-b-xl  p-4 h-full w-full  text-center min-h-max text-3xl border-t-2 border-black flex items-center justify-center"
              href={"/teachers/dashboard/booked"}
            >
              View booking
            </Link>
          </div>
          <div className="w-full flex items-center justify-center ">
            <Link
              className=" hover:bg-gray-200 font-semibold  p-4 h-full w-full  text-center min-h-max text-3xl border-t-2  border-black flex items-center justify-center"
              href={"/teachers/dashboard/old"}
            >
              View Old Classes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
