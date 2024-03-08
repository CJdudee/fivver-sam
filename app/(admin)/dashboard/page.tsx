import CreateTeacher from "@/app/components/admin/CreateTeacher";
import ViewAll from "@/app/components/admin/dashboard/ViewAll";
import { decodeUserAndCheckAdmin } from "@/app/lib/finallyRoleCheck";
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

  // roleChecker(sessionUser, ['admin', 'teacher']);
  await decodeUserAndCheckAdmin()
  console.log(sessionUser);

  if (!sessionUser) redirect("/");

  const teachers = await Teacher.find().limit(4).populate("user", "-password");

  const fewUsers = await User.find().limit(4).exec();

  console.log(teachers);

  const teachersJson = simpleJson(teachers);
  const userJson = simpleJson(fewUsers);

  return (
    <div className="admin-dashboard text-white h-full min-h-[900px] w-full md:w-4/5 mx-auto">
      <header className="header bg-gradient-to-r from-orange-600 to-orange-800 text-white py-4 rounded-b-xl text-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4  h-[80vh]">
        <div className="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 text-black font-extrabold  flex justify-center items-center h-full">
          <Link
            href="/dashboard/create"
            className="rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 text-black font-extrabold p-2 flex justify-center items-center h-full w-full"
          >
            Create Credentials
          </Link>
        </div>
        <ViewAll teachersJson={teachersJson} userJson={userJson} />
        <div className="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 text-black font-extrabold  flex justify-center items-center h-full">
          <Link
            href="/dashboard/changeprice"
            className="rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 text-black font-extrabold p-2 flex justify-center items-center h-full w-full"
          >
            Change Pricing
          </Link>
        </div>
        <Link
            href="/dashboard/settings"
            className="rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 text-black font-extrabold p-2 flex justify-center items-center h-full w-full"
          >
            Admin settings
          </Link>
      </main>
    </div>
  );
}

{/* <div className="h-1/6 w-full  transition-all duration-300 mx-auto rounded-xl pri">
  <Link
    href={"/dashboard/changeprice"}
    className="text-2xl text-black font-extrabold p-2 flex justify-center items-center h-full"
  >
    View Teacher Monthly Classes
  </Link>
</div> */}
{/* <CreateTeacher /> */}

//dash board could an absoulte design and will have to remove the navbar

//this is gonnna have to be connected

//lets focus on making teachers and there days off and daily routine (:)p)
