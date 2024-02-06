"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Profile from "../../Profile";
import AuthButtons from "../../AuthButtons";
import Link from "next/link";

export default function PhoneNav({ session, tokensJson, linkArray }: any) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="w-full flex">
      <div className="w-1/2 relative">
        <button onClick={() => setOpenNav(!openNav)}>
          <RxHamburgerMenu className="h-8 w-8 text-white" />
        </button>
        {openNav && (
          <div className="w-full left-0 right-0 bg-gray-800 absolute flex flex-col justify-center items-center rounded-xl py-2 text-white gap-2">
            {linkArray?.map((l: any, index: number) => {

              return (
                <Link key={index} href={l.link}>{l.text}</Link>
              )
            })}
          </div>
        )}
      </div>

      <div className="w-1/2  ">
        {session && <Profile user={session} tokens={tokensJson} />}

        <div className="flex gap-4 items-center justify-center">
          {!session && <AuthButtons session={session} />}
        </div>
      </div>
    </div>
  );
}