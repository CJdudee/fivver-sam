import DisplayTeacher from "@/app/components/users/teacherList/DisplayTeacher";
import { serverUser } from "@/app/lib/serverAuth";
import AssignTeacher from "@/models/AssignTeacher";
import Teacher from "@/models/Teacher";
import TeacherWeek from "@/models/TeacherWeek";
import { capitalize, simpleJson } from "@/utils/helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export default async function Page() {
  const user = await serverUser();

  if (!user) redirect("/");

  if (user) {
    const foundAssigned = await AssignTeacher.findOne({ user: user.id });

    if (foundAssigned) redirect(`/teach/${foundAssigned.teacher}`);
  }

  const teachers = await Teacher.find().populate("user", "-password").exec();
  // console.log(teachers)

  const teachersId = teachers.map((t: any) => t._id);

  const teachersWeeks = await TeacherWeek.find({ teacher: teachersId }).exec();
 

  console.log(teachersWeeks, "this is the week");

  const teachersJson = JSON.parse(JSON.stringify(teachers));

  const teachersWeekJson = simpleJson(teachersWeeks);
  // console.log(teachers);
  return (
    <div className=" min-h-[800px]">
      <DisplayTeacher teachersJson={teachersJson} teachersWeekJson={teachersWeekJson} />
    </div>
  );
}


function getTeacherSchedule(teacher: any, teacherWeek: any) {
 return  teacherWeek.find(
    (w: Record<string, unknown>) => {
      return w.teacher == teacher._id;
    }
  )?.weekdays;
}


const ScheduleDetails = ({schedule}: any) => [

]

// {foundSch == undefined && (
//   <div className="h-2/3 flex items-center justify-center text-4xl font-extrabold">
//     <p>No schedule was found</p>
//   </div>
// )}