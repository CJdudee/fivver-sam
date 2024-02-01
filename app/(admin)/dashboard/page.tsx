import CreateTeacher from "@/app/components/admin/CreateTeacher";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { simpleJson } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const teachers = await Teacher.find().limit(4).populate("user", "-password");

  const fewUsers = await User.find().limit(4).exec();

  console.log(teachers);

  const teachersJson = simpleJson(teachers);
  const userJson = simpleJson(fewUsers);

  return (
    <div className="text-center text-white  h-screen min-h-[100dvh]">
      <div className=" p-4 flex flex-col  gap-4 h-full">
        <div className=" h-1/6 w-1/2 mx-auto rounded-xl bg-[#d5d5d5] ">
          <Link
            href={"/dashboard/create"}
            className="text-xl h-full  p-2  flex justify-center items-center text-black font-bold"
          >
            Create New Teacher
          </Link>
        </div>
        <div className="h-3/6 w-1/2 mx-auto rounded-xl  flex gap-2">
          <Link
            href={"/dashboard/viewteachers"}
            className="text-xl bg-[#d5d5d5] w-full h-full rounded-xl text-black font-extrabold p-2"
          >
            <p className="h-1/5 bg-slate-200 rounded-xl">View All Teacher</p>
            <div className="flex flex-col h-full">
              {teachersJson.map((j: any, index: number) => {
                return (
                  <div
                    key={j._id}
                    className={` ${
                      index % 2 == 0 ? "bg-slate-300" : "bg-slate-200"
                    } h-1/5 rounded-xl `}
                  >
                    <p>{j.user.username}</p>
                  </div>
                );
              })}
            </div>
          </Link>
          <Link
            href={"/dashboard/viewusers"}
            className="text-xl bg-[#d5d5d5] w-full h-full rounded-xl text-black font-extrabold p-2"
          >
            <p className="h-1/5 bg-slate-200 rounded-xl">View All User</p>

            <div className="flex flex-col h-full">
              {userJson.map((u: any, index: number) => {
                return (
                  <div
                    key={u._id}
                    className={` ${
                      index % 2 == 0 ? "bg-slate-300" : "bg-slate-200"
                    } h-1/5 rounded-xl `}
                  >
                    <p>{u.username}</p>
                    <div className="flex gap-4 w-2/3 mx-auto">
                      <p className="text-sm w-1/3 text-center">Email:</p>
                      {!u.email.length && (
                        <p className="text-sm w-2/3 text-center">No Email</p>
                      )}
                      {u.email?.length && (
                        <p className="text-sm w-2/3 text-center truncate">{u.email}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Link>
        </div>
        <div className="h-2/6 w-1/2 hover:w-2/3 transition-all duration-300 mx-auto rounded-xl bg-[#d5d5d5]">
          <Link
            href={"/dashboard/changeprice"}
            className="text-xl text-black font-extrabold p-2 flex justify-center items-center h-5/6"
          >
            Change Pricing
          </Link>
        </div>
        {/* <CreateTeacher /> */}
      </div>
    </div>
  );
}

//dash board could an absoulte design and will have to remove the navbar

//this is gonnna have to be connected

//lets focus on making teachers and there days off and daily routine (:)p)
