

import { serverUser } from "@/app/lib/serverAuth";
import { auth } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";
// import { signOut } from "@/auth";
// import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
// import Profile from "../Profile";
// import AuthButtons from "../AuthButtons";
// import NavBarHam from "../NavBarHam";
import { FaBookmark } from "react-icons/fa";
import { K2D } from "next/font/google";
import Profile from "./Profile";
import AuthButtons from "./AuthButtons";
import NavBarHam from "./NavBarHam";
// import AuthButtons from "./AuthButtons";
// import { serverUser } from "../lib/serverAuth";
// import User from "@/models/User";
// import Profile from "./Profile";
// import { Session } from "next-auth";

const k2 = K2D({ subsets: ["latin"], weight: "800" });

export default async function AdminNavBar() {

  // const session = await auth()

  const session = await serverUser()

  // console.log(session, 'where is thsi')


  return (
    <nav className=" sticky top-0 z-40 ">
      <div className="hidden border-b-1  border-black min-h-[8vh] md:flex items-center justify-between md:px-8  w-full  pb-1   gap-4  bg-[#242424]">
        <Link href={'/'} className=" md:px-[16%]">
          <div className=" rounded-b-xl bg-gradient-to-r from-[#D9643A] to-[#E35D5B] hover:bg-gradient-to-br transition-all duration-1000 absolute w-fit md:w-[6%] min-h-fit  top-0 flex flex-col  ">
            <div className="w-full ">
              <FaBookmark className="text-white ml-auto mr-1" />
            </div>
            <div
              className={` ${k2.className} h-full px-1 text-xl flex flex-col font-extrabold text-white `}
            >
              <p className="w-full text-center text-2xl">Lang</p>
              <p className="w-full text-center text-2xl -mt-4">go</p>
            </div>
          </div>
        </Link>

        <div className="text-center flex items-center justify-end gap-4 w-full drop-shadow-lg pl-4 ">
          <Link
            href={"/pricing"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Pricing
          </Link>
          <Link
            href={"/teach"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Teachers
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

      <div className="border-b-1  border-black min-h-[8vh] flex items-center justify-start md:px-8  w-full  pb-1   gap-4  bg-[#242424] md:hidden">
       

        <NavBarHam />
        
      </div>
    </nav>
  );
}
