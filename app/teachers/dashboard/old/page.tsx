import OldBookingMap from "@/app/components/teachers/old/OldBookingMap";
import { serverUser } from "@/app/lib/serverAuth";
import Booking from "@/models/Booking";
import Teacher from "@/models/Teacher";
import { simpleJson } from "@/utils/helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const user = await serverUser();
  if (!user) redirect("/");

  const foundTeacher = await Teacher.findOne({ user: user.id });

  if (!foundTeacher) redirect("/");

  const foundBooking = await Booking.find({
    teacher: foundTeacher._id,
    date: { $lt: new Date() },
  }).populate("student", "-password -customerId");

  console.log(foundBooking);

  const oldBooking = simpleJson(foundBooking);

  return (
    <div className="h-full min-h-[800px]">
      <p className="text-center text-2xl text-white font-semibold">Past Bookings</p>
      {oldBooking.length == 0 && (
        <div className="text-center text-white text-2xl flex justify-center items-center flex-col h-full pb-8 font-bold">
          <p>No Old Bookings</p>
          <Link
            className="underline hover:text-gray-300"
            href={"/teachers/dashboard"}
          >
            Go Back to Dashboard
          </Link>
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-8 pt-8 px-2">
        {oldBooking.map((o: any, i: number) => {
          return <OldBookingMap key={i} userData={o.student} data={o} />;
        })}
      </div>
    </div>
  );
}
