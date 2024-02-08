import CreateTeacher from "@/app/components/admin/CreateTeacher";
import ViewAll from "@/app/components/admin/dashboard/ViewAll";
import { roleChecker } from "@/app/lib/roleCheck";
import { serverUser } from "@/app/lib/serverAuth";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { simpleJson } from "@/utils/helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const sessionUser = await serverUser();

  roleChecker(sessionUser, "admin");
  console.log(sessionUser);

  if (!sessionUser) redirect("/");

  const teachers = await Teacher.find().limit(4).populate("user", "-password");

  const fewUsers = await User.find().limit(4).exec();

  console.log(teachers);

  const teachersJson = simpleJson(teachers);
  const userJson = simpleJson(fewUsers);

  return (
    <div className="text-center text-white h-[92vh] min-h-[600px] w-full md:w-4/5 mx-auto">
      <div className=" p-4 flex flex-col  gap-4 h-full w-full">
        <div className=" h-1/6 w-full transition-all duration-300 mx-auto rounded-xl pri">
          <Link
            href={"/dashboard/create"}
            className="text-2xl h-full  p-2  flex justify-center items-center text-black font-extrabold"
          >
            Create Credentials
          </Link>
        </div>
        <div className="h-4/6">
          <ViewAll teachersJson={teachersJson} userJson={userJson} />
        </div>
        <div className="h-1/6 w-full  transition-all duration-300 mx-auto rounded-xl pri">
          <Link
            href={"/dashboard/changeprice"}
            className="text-2xl text-black font-extrabold p-2 flex justify-center items-center h-full"
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
