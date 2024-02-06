"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function AuthButtons({
  session,
}: {
  session: Session | null | any;
}) {
  // console.log(session)

  const router = useRouter()

  return (
    <>
      {!session ? (
        <>
          <button
          className=" rounded-full py-0.5 px-6 font-bold bg-white hover:drop-shadow-2xl hover:shadow-lg hover:shadow-white transition-all duration-500 h-1/2 "
            onClick={() => {
              // signIn('google')
              signIn();
              console.log("hey");
            }}
          >
            Login
          </button>
          <button className=" rounded-lg p-2 transition-colors  duration-500  place-content-center align-middle text-[#D0D0D0]  hover:text-[#858585]" onClick={() => {
            router.push('/api/auth/newuser')
          }}>
          Register
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-red-600 rounded-lg p-2 transition-colors hover:bg-red-500 duration-300  place-content-center align-middle text-white"
            onClick={() => signOut()}
          >
            SignOut
          </button>
        </>
      )}
    </>
  );
}
