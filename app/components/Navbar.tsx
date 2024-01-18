

import { auth } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";
// import { signOut } from "@/auth";
// import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {

  const session = await auth()

  // console.log(session?.user)

  // const {data: session, status, update} = useSession()

  // console.log(session, status)

  return (
    <nav className=" border-b-2  border-black min-h-[6vh] flex items-center justify-between px-8 sticky top-0 pb-1 bg-gradient-to-bl from-slate-600 to-slate-500  z-50">
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 bg-white rounded-full" />
        <h4 className="text-xl text-white">Lango</h4>
      </div>
      <div>
        <Link href={"/pricing"} className="text-[1.1rem]">Pricing</Link>
      </div>

      <div className="gap-4 flex">
        <AuthButtons session={session} />
      </div>
    </nav>
  );
}
