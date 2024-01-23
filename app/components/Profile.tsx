"use client";

import { signOutUser } from "@/actions/signOut";
import { User } from "next-auth";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Profile({ user }: any) {
  const [openProfile, setOpenProfile] = useState(false);

  const profileDrop = useRef<HTMLDivElement | null>(null);

  const isTeacher = user?.roles.includes("teacher");

  const isAdmin = user?.roles.includes("admin");

  const handleSignOut =  () => {
     signOutUser()
  }
  // console.log(isAdmin)

  useEffect(() => {
    if (!openProfile) return;

    const handleClick = (e: any) => {
      if (profileDrop.current && !profileDrop.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [openProfile]);

  console.log(user);
  return (
    <div
      ref={profileDrop}
      className="flex justify-end relative  w-full "
    >
      <button
        className="bg-blue-800 w-7 h-7 rounded-full hover:rounded-tr-none hover:rounded-tl-none hover:shadow-2xl  hover:shadow-white transition-all duration-500"
        onClick={() => setOpenProfile(!openProfile)}
      />
      { 
         <div
          className={`  absolute top-8 right-3 w-1/2 bg-slate-800 text-white text-center py-2 rounded-xl rounded-tl-[15px] rounded-tr-none transition-all flex flex-col  ${
            openProfile ? " z-0 opacity-100" : " -z-50 opacity-0 invisible"
          }`}
        >
          <p className=" transition-all duration-300  hover:bg-purple-500 active:bg-purple-600 active:duration-0  w-full rounded"> Hey</p>

          {/* <div className="w-full"> */}
            <Link href={"/dashboard"} onClick={() => {setOpenProfile(false)}} className=" transition-all duration-300  hover:bg-purple-500 active:bg-purple-600 active:duration-0 w-ful rounded">
              Admin Panel
            </Link>
          {/* </div> */}
          {user.roles.length == 1 && user.roles.includes("user") && (
            <p className="border-t mt-2 py-1">Hours: {user.tokens}</p>
          )}
          <button className=" transition-all duration-300  hover:bg-purple-500 active:bg-purple-600 active:duration-0 w-ful rounded" onClick={handleSignOut}>
            SignOut
          </button>
        </div>
      }
    </div>
  );
}
