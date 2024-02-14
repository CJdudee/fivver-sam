import UserBooking from "@/app/components/users/UserBooking";
import { serverUser } from "@/app/lib/serverAuth";
import Booking from "@/models/Booking";
import ClosedDay from "@/models/ClosedDay";
import Teacher from "@/models/Teacher";
import TeacherWeek from "@/models/TeacherWeek";
import Token from "@/models/Token";
import { simpleJson } from "@/utils/helpers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export default async function Page(req: NextRequest | any, res: NextResponse) {
  const user = await serverUser();
  if (!req.params) return null;

  if (!user) redirect('/');
  // console.log(req?.params)
  const teacherId = req.params.teacherId;

  const teacher = await Teacher.findOne({ _id: teacherId }).populate(
    "user",
    "-password"
  );
  const teacherWeek = await TeacherWeek.findOne({ teacher: teacherId });
  const closedDate = await ClosedDay.find({ teacher: teacherId });

  const booked = await Booking.find({
    teacher: teacherId,
    status: "pending",
    date: { $gte: new Date() },
  });

  const foundToken = await Token.find({
    user: user?.id,
    expire: { $gt: new Date() },
  })
    .sort({ groupSize: 1 })
    .exec();

  const foundTokenJson = simpleJson(foundToken);

  const firstGroup = foundTokenJson.filter((t: any) => t.groupSize == 1);
  const secondGroup = foundTokenJson.filter((t: any) => t.groupSize == 2);
  const thirdGroup = foundTokenJson.filter((t: any) => t.groupSize == 3);

  const firstGroupTokens = firstGroup.reduce((acc: number, cur: any) => acc + cur.tokens, 0)
  const secondGroupTokens = secondGroup.reduce((acc: number, cur: any) => acc + cur.tokens, 0)
  const thirdGroupTokens = thirdGroup.reduce((acc: number, cur: any) => acc + cur.tokens, 0)

  const tokenGroup = {
    firstGroupTokens,
    secondGroupTokens,
    thirdGroupTokens,
  };

  // console.log(foundTokenJson)
  const { username, email } = teacher.user;

  // console.log(teacherWeek)
  return (
    <div className={` h-full min-h-[750px] md:px-24 text-white`}>
      <UserBooking
        teacher={simpleJson(teacher)}
        teacherWeek={simpleJson(teacherWeek)}
        closedDate={simpleJson(closedDate)}
        user={user}
        booked={simpleJson(booked)}
        foundTokenJson={tokenGroup}
      />
    </div>
  );
}
