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
  // const teachersWeeks = await TeacherWeek.find({_id: teachersId}).exec()
  // const teachersWeeks = await TeacherWeek.find({_id: {$in: teachersId}}).exec()

  console.log(teachersWeeks, "this is the week");

  const teachersJson = JSON.parse(JSON.stringify(teachers));

  const teachersWeekJson = simpleJson(teachersWeeks);
  // console.log(teachers);
  return (
    <div className=" min-h-[800px]">
      <div className="grid grid-cols-1  gap-4 py-4 px-4  ">
        {teachersJson?.map((t: any) => {
          const { username, email } = t.user;

          const foundSch = teachersWeekJson.find(
            (w: Record<string, unknown>) => {
              return w.teacher == t._id;
            }
          )?.weekdays;

          const teacherWeek = getTeacherSchedule(t, teachersWeekJson)

          console.log(teacherWeek)
          console.log(foundSch, "found week");
          return (
            <div
              key={t._id}
              className="bg-white outline outline-2 outline-[#3D3D3D] w-full md:w-4/5 mx-auto rounded-xl p-2 pt-2 pb-2 drop-shadow-xl  min-h-[12rem] h-full flex flex-col justify-evenly  "
            >
             
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-xl pr-4">
                  {capitalize(username)}
                </p>
                {/* {foundSch != undefined && foundSch.length != 0 && (
                  <span className="text-sm bg-green-500 text-white rounded-full px-2 py-1">
                    Schedule Available
                  </span>
                )} */}
              </div>

              

              {foundSch != undefined && foundSch.length != 0 && (
                <div className="h-2/3 flex items-center justify-center  font-extrabold">
                  <ul
                    className="h-full flex gap-4 w-4/5  justify-center mt-3"
                    style={
                      {
                        //  transform: `translateX(-${tran}dvh)`
                      }
                    }
                  >
                    {teacherWeek.map((f: any) => {
                      // console.log(f)
                      // {foundSch.map((f: Record<string , unknown>) => {
                      if (f.isOpen == false || f.openTime.length == 0)
                        return (
                          <li
                            className={`${
                              f.isOpen == false && " bg-[#585757] text-white"
                            } rounded-xl w-full px-2 py-1 text-sm flex flex-col  items-center h-4/5 justify-center`}
                            key={`${f.name} ${f.index}`}
                          >
                            <p className="h-[40%] ">
                              {capitalize(f.name as string)}
                            </p>
                            <p className="text-lg">Closed</p>
                          </li>
                        );

                      return (
                        <li
                        className={`
                        rounded-lg p-4 bg-gray-100 hover:bg-gray-200
                        ${f.isOpen === false ? 'bg-gray-400 text-white' : ''}
                        flex flex-col items-center justify-between w-full
                      `}
                          key={`${f.name} ${f.index}`}
                        >
                          <p className="font-bold text-lg">{capitalize(f.name as string)}</p>

                          {f.openTime.length > 0 &&
                            f.openTime.map((o: any, i: number) => {
                              return (
                                <div key={i} className="text-xs my-auto ">
                                  <p>Open:</p>
                                  <p>{o.openTime as string}</p>
                                  <p>Close:</p>
                                  <p>{o.closeTime as string}</p>
                                </div>
                              );
                            })}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className=" h-1/6 flex justify-center items-center  my-auto">
                <Link
                  className="font-bold bg-gradient-to-b from-black to-[#3D3D3D] px-8 py-0.5 rounded-full text-white "
                  href={`/teach/${t._id}`}
                >
                  Book
                </Link>
              </div>
            </div>
          );
        })}
      </div>
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