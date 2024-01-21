

import { auth } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";
// import { signOut } from "@/auth";
// import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";
import { serverUser } from "../lib/serverAuth";
import User from "@/models/User";
import Profile from "./Profile";
import { Session } from "next-auth";

export default async function Navbar() {

  // const session = await auth()

  const session = await serverUser()

  // console.log(session, 'where is thsi')

  let user = null

  if(session) {
    user = await User.findOne({_id: session.id})
  }

  // const allUser = await User.find({roles: ['user']})

  // console.log(allUser)
  // console.log(user)
  // const {data: session, status, update} = useSession()

  // console.log(session, status)

  return (
    <nav className=" border-b-2  border-black min-h-[7vh] flex items-center justify-between px-8 sticky top-0 pb-1 bg-gradient-to-bl from-slate-600 to-slate-500  z-40 gap-4 drop-shadow-xl shadow-lg">
      <div className="flex gap-2 items-center w-1/3 bg-slate-400">
        <div className="w-7 h-7 bg-white rounded-full" />
        <h4 className="text-3xl font-mono font-bold bg-slate-800 text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 via-amber-200 to-yellow-600">Lang-go</h4>
      </div>
      <div className="text-center flex items-center justify-center gap-4 w-full bg-slate-50">
        <Link href={"/pricing"} className="text-[1.1rem]">Pricing</Link>
        <Link href={"/teach"} className="text-[1.1rem]">Teachers</Link>
      </div>

      {/* <div className="gap-4 flex items-center justify-end w-1/3 bg-slate-800"> */}
      <div className="w-1/3 bg-violet-300 ">

        
        {session && <Profile user={session} />}

         {!user && <p className="text-white text-xl">Hours: {user?.tokens}</p>}
        {!session && <AuthButtons session={session} /> }
      </div>
    </nav>
  );
}
