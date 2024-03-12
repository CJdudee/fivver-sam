import BookedLessons from "@/app/components/teachers/BookedLessons";
import UserBookedLessons from "@/app/components/users/UserBookedLessons";
import { connectingMongoose } from "@/app/lib/connectMongo";
import { roleChecker } from "@/app/lib/roleCheck";
import { serverUser } from "@/app/lib/serverAuth";
import Booking from "@/models/Booking";
import { simpleJson } from "@/utils/helpers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const user = await serverUser();

  if (!user) redirect("/api/auth/signin");
  connectingMongoose();

  const booked = await Booking.find({
    student: user.id,
    date: { $gte: new Date() },
    status: "pending",
  })
    .populate({ path: "teacher", populate: { path: "user" } })
    .sort({ date: 1 })
    .exec();

  // console.log(booked)

  return (
    <div className="min-h-screen h-full ">
      <p className="text-center text-3xl font-extrabold text-orange-600">
        Future Booking
      </p>
      <UserBookedLessons booked={simpleJson(booked)} />
    </div>
  );
}
