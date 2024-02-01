import { serverUser } from "@/app/lib/serverAuth";
import Teacher from "@/models/Teacher";
import { simpleJson } from "@/utils/helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FcSettings } from "react-icons/fc";

export default async function Page() {
  const user = await serverUser();

  if (!user) redirect("/");

  const teacher = await Teacher.findOne({ user: user.id });

  const teacherJson = simpleJson(teacher);

  console.log(teacherJson);

  return (
    <div className="flex flex-col gap-8 justify-evenly w-full items-center p-24 pt-4 h-svh relative ">
      <div className=" absolute top-0 right-28">
        <FcSettings className="w-10 h-10 hover:rotate-90 transition-all duratino-500" />
      </div>

      <div className="flex text-black bg-[#c5c5c5] gap-8 p-10 w-2/3 rounded-xl justify-evenly">
        <div className="text-center text-2xl font-bold w-1/3 border-r-2">
          <p>Total Orders:</p> <p>{teacherJson.orders}</p>
        </div>
        <div className="text-center text-2xl font-bold w-1/3 border-r-2">
          <p>Current Orders:</p> <p>{teacherJson.currentOrders}</p>
        </div>
        <div className="text-center text-2xl font-bold w-1/3">
          <p>Canceled Orders:</p> <p>{teacherJson.canceledOrders}</p>
        </div>
      </div>
      <Link
        className="bg-[#c5c5c5] font-semibold rounded-full p-4 h-full w-2/3 text-center min-h-max text-3xl"
        href={"/teachers/dashboard/schedule"}
      >
        Make Schedule
      </Link>
      <Link
        className="bg-[#c5c5c5] font-semibold rounded-full p-4 h-full w-2/3 text-center min-h-max text-3xl"
        href={"/teachers/dashboard/booked"}
      >
        View booking
      </Link>
    </div>
  );
}
