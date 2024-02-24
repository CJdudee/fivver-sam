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
import PhoneNav from "./users/navbar/PhoneNav";
import LogoLink from "./users/navbar/LogoLink";
// import AuthButtons from "./AuthButtons";
// import { serverUser } from "../lib/serverAuth";
// import User from "@/models/User";
// import Profile from "./Profile";
// import { Session } from "next-auth";

const k2 = K2D({ subsets: ["latin"], weight: "800" });

export default async function AdminNavBar() {
  // const session = await auth()

  const session = await serverUser();

  const linkArray = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Create", link: "/dashboard/create" },
    { text: "View Teachers", link: "/dashboard/viewteachers" },
    { text: "View User", link: "/dashboard/viewusers" },
    { text: "Pricing", link: "/dashboard/changeprice" },
  ];

  // console.log(session, 'where is thsi')

  return (
    <nav className=" sticky top-0 z-40 ">
      <div className="hidden border-b-1  border-black min-h-[8vh] md:flex items-center justify-between md:px-8  w-full  pb-1   gap-4  bg-[#242424]">
        <LogoLink />

        <div className="text-center flex items-center justify-end gap-4 w-full drop-shadow-lg pl-4 ">
          <Link
            href={"/dashboard"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Dashboard
          </Link>
          <Link
            href={"/dashboard/create"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Create
          </Link>
          <Link
            href={"/dashboard/viewusers"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            View Users
          </Link>
          <Link
            href={"/dashboard/changeprice"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Pricing
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
        <PhoneNav session={session} tokensJson={null} linkArray={linkArray} />
      </div>
    </nav>
  );
}
