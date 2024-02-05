import { roleChecker } from "@/app/lib/roleCheck";
import { serverUser } from "@/app/lib/serverAuth";
import Teacher from "@/models/Teacher";
import { simpleJson } from "@/utils/helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FcSettings } from "react-icons/fc";

export default async function Page() {
  const user = await serverUser();

  roleChecker(user, 'teacher')

  if (!user) redirect("/");

  const teacher = await Teacher.findOne({ user: user.id });

  const teacherJson = simpleJson(teacher);

  console.log(teacherJson);

  return (
    <div className="flex flex-col gap-8 justify-evenly w-full items-center md:p-24 pt-4 h-svh relative ">
      <div className=" absolute top-8 right-4 md:right-28">
        {/* <FcSettings className="w-10 h-10 hover:rotate-90 transition-all duratino-500" /> */}
        <Link href={'/profile'} className="outline outline-white outline-[.5px] px-6 py-2 rounded-full text-[#c5c5c5] hover:text-[#838383]">Profile</Link>
      </div>
      <div className="flex flex-col justify-evenly w-full items-center pb-24 pt-4">


      <div className="flex  items-center flex-row text-black bg-[#c9c8c8] gap-8 py-10 px-4 md:p-10 w-full md:w-2/3 rounded-t-xl justify-evenly">
        <div className="flex justify-center items-center md:text-2xl font-bold w-1/3  md:border-r-2">
          <p className="w-full flex justify-center ">Total Orders</p> <p className="w-full flex justify-center ">{teacherJson.orders}</p>
        </div>
        <div className="flex justify-center items-center md:text-2xl font-bold w-1/3  md:border-r-2">
          <p className="w-full flex justify-center ">Current Orders</p> <p className="w-full flex justify-center ">{teacherJson.currentOrders}</p>
        </div>
        <div className="flex justify-center items-center md:text-2xl font-bold w-1/3">
          <p className="w-1/2 flex justify-center ">Cancel Orders</p> <p className="w-1/2 flex justify-center ">{teacherJson.canceledOrders}</p>
        </div>
      </div>
      <Link
        className="bg-[#c9c8c8] font-semibold  p-4 h-full w-full md:w-2/3 text-center min-h-max text-3xl"
        href={"/teachers/dashboard/schedule"}
        >
        Make Schedule
      </Link>
      <Link
        className="bg-[#c9c8c8] font-semibold rounded-b-xl  p-4 h-full w-full md:w-2/3 text-center min-h-max text-3xl"
        href={"/teachers/dashboard/booked"}
        >
        View booking
      </Link>
    </div>
        </div>
  );
}
