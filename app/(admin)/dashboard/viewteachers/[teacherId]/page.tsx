import OldBookingMap from "@/app/components/teachers/old/OldBookingMap";
import { decodeUserAndCheckAdmin } from "@/app/lib/finallyRoleCheck";
import Booking from "@/models/Booking";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { capitalize, simpleJson } from "@/utils/helpers";
import { Lexend_Tera } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default async function Page({ params, searchParams }: any) {
  // const params = useParams()
  console.log(params);
  console.log(searchParams);

  await decodeUserAndCheckAdmin();

  let teacher = await Teacher.findOne({ _id: params.teacherId })
    .populate("user", "-password")
    .exec();

    if(!teacher) {
      const foundUser = await User.findOne({_id: params.teacherId})

      teacher = await Teacher.findOne({ user: foundUser._id}).populate('user')
    }

  const bookings = await Booking.find({ teacher: teacher._id }).populate(
    "student"
  );

  const teacherJson = simpleJson(teacher);

  const bookingJson = simpleJson(bookings);

  console.log(bookings, "hey");
  return (
    <div className="h-full min-h-screen ">
      <div className=" relative">
        <div className="absolute left-12 underline-offset-1   top-4 bottom-0 my-auto flex items-center justify-center">
          <Link
            href={"/dashboard/viewteachers"}
            className="text-center text-xs font-bold text-white float-left hover:text-gray-200 hover:underline   "
          >
            View All Teachers
          </Link>
        </div>
        <p className="text-center text-4xl font-bold text-white float-none mx-auto">
          Name: {capitalize(teacherJson?.user?.firstName)}
        </p>
      </div>

      {bookingJson.length == 0 && (
        <div className="h-full flex items-center justify-center pb-12 text-3xl font-extrabold text-white drop-shadow-xl shadow-2xl">
          <p>No Past Bookings</p>
        </div>
      )}

      {/* {bookingJson.legth != 0 && (
        <figure className="p-[1em] rounded-[1em] bg-[#eee] m-0 w-full text-black text-center mt-8">
            <p>hey</p>
        </figure>
        // <OldBookingMap userData={booking.student}
      )} */}

      <figure className="flex justify-center items-center flex-col gap-8 mt-8">
        {bookingJson.map((b: any, i: number) => {
          return <OldBookingMap key={i} userData={b.student} data={b} />;
        })}
      </figure>
    </div>
  );
}
