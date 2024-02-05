

import { serverUser } from "@/app/lib/serverAuth";
import { auth } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";
// import { signOut } from "@/auth";
// import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Profile from "../Profile";
import AuthButtons from "../AuthButtons";
import NavBarHam from "../NavBarHam";
import { FaBookmark } from "react-icons/fa";
import { K2D } from "next/font/google";
import { redirect } from "next/navigation";
import PhoneNav from "../users/navbar/PhoneNav";
import LogoLink from "../users/navbar/LogoLink";
// import AuthButtons from "./AuthButtons";
// import { serverUser } from "../lib/serverAuth";
// import User from "@/models/User";
// import Profile from "./Profile";
// import { Session } from "next-auth";

const k2 = K2D({ subsets: ["latin"], weight: "800" });

export default async function TeacherNavbar() {

  // const session = await auth()

  const session: any = await serverUser()

  // console.log(session)

  if(!session ||!session.roles || !session.roles.includes('teacher')) redirect('/')

  // console.log(session, 'where is thsi')


  const tokensJson = null
  return (
    <nav className=" sticky top-0 z-40 h-full ">
      <div className="hidden border-b-1  border-black min-h-[8vh] md:flex items-center justify-between md:px-8  w-full  pb-1  gap-4  bg-[#242424] h-full">
        <LogoLink />

        <div className="text-center flex items-center justify-end gap-4 w-full drop-shadow-lg pl-4 h-full ">
          <Link
            href={"/teachers/dashboard"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Dashboard
          </Link>
          <Link
            href={"/teachers/dashboard/booked"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Booked
          </Link>
          <Link
            href={"/teachers/dashboard/schedule"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Schedule
          </Link>
        </div>

        {/* <div className="gap-4 flex items-center justify-end w-1/3 bg-slate-800"> */}
        <div className="w-1/3  ">
          {session && <Profile user={session} />}

          <div className="flex gap-4 items-center justify-center">
            {!session && <AuthButtons session={session} />}
          </div>
        </div>
      </div>

      <div className="border-b-1 border-black min-h-[8vh] flex items-center justify-start md:px-8  w-full  pb-1   gap-4  bg-[#242424] md:hidden">
       

        {/* <NavBarHam /> */}

        <PhoneNav session={session} tokensJson={tokensJson} />
        
      </div>
    </nav>
  );
}
