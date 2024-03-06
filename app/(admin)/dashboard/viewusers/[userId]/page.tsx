import ViewUserClient from "@/app/components/admin/dashboard/user/singleUser/ViewUserClient";
import PastBookings from "@/app/components/admin/viewUsers/PastBookings";
import OldBookingMap from "@/app/components/teachers/old/OldBookingMap";
import { decodeUserAndCheckAdmin } from "@/app/lib/finallyRoleCheck";
import Booking from "@/models/Booking";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { capitalize, simpleJson } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

export default async function Page({ params, searchParams }: any) {
  console.log(params);
  console.log(searchParams);

  await decodeUserAndCheckAdmin();

  const student = await User.findOne({ _id: params.userId })
    .select("-password")
    .exec();

  const bookings = await Booking.find({ student: student._id }).populate({path: 'teacher', populate: { path: 'user', select: '-password'}})

  const studentJson = simpleJson(student);

  const bookingJson = simpleJson(bookings);

  console.log(bookingJson);

  return (
    <div className="min-h-screen h-full">
      <div className=" relative">
        <div className="absolute left-12 underline-offset-1   top-0 bottom-0 my-auto flex items-center justify-center">
          <Link
            href={"/dashboard/viewusers"}
            className="text-center text-xs font-bold text-white float-left hover:text-gray-200 hover:underline   "
          >
            View All Users
          </Link>
        </div>
        <p className="text-center text-4xl font-bold text-white float-none mx-auto">
          {capitalize(studentJson.firstName)}
        </p>
      </div>

      <div>
        <ViewUserClient bookingArray={bookingJson} studentInfo={studentJson} />
      </div>

    </div>
  );
}



// {bookingJson.length == 0 && (
//   <div className="h-full flex items-center justify-center pb-12 text-3xl font-extrabold text-white drop-shadow-xl shadow-2xl">
//     <p>No Past Bookings</p>
//   </div>
// )}

// <figure className="flex justify-center items-center flex-col gap-8 mt-8">
//   {bookingJson.map((b: any, i: number) => {
//     return <PastBookings key={i} userData={b.teacher.user} data={b} isTeacher={true} />;
//   })}
// </figure>