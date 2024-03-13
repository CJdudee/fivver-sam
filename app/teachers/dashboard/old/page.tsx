import OldBookingMap from "@/app/components/teachers/old/OldBookingMap";
import { decodeUserAndCheckAdmin, decodeUserAndCheckTeacher } from "@/app/lib/finallyRoleCheck";
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

  // await decodeUserAndCheckAdmin()
  await decodeUserAndCheckTeacher()

  const foundTeacher = await Teacher.findOne({ user: user.id });

  if (!foundTeacher) redirect("/");

  const foundBooking = await Booking.find({
    teacher: foundTeacher._id,
    date: { $lt: new Date() },
    status: 'pending'
  }).populate("student", "-password -customerId");

  console.log(foundBooking);

  const oldBooking = simpleJson(foundBooking);

  return (
    <div className="min-h-full h-[88vh] pb-8 ">
      <p className="text-center text-3xl text-white font-bold pt-5 ">Past Bookings</p>
      {oldBooking.length == 0 && (
        <div className="text-center text-white text-2xl flex justify-center items-center flex-col h-full pb-8 font-bold md:gap-12">
          <p>No Old Bookings</p>
          <Link
            className="underline hover:text-gray-300"
            href={"/teachers/dashboard"}
          >
            Go Back to Dashboard
          </Link>
        </div>
      )}

      <div className="flex flex-col md:grid grid-cols-2 justify-center items-center gap-6 pt-8 px-4">
        {oldBooking.map((o: any, i: number) => {
          return <OldBookingMap key={i} userData={o.student} data={o} />;
        })}
      </div>
    </div>
  );
}
