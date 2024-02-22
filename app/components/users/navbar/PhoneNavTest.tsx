"use client";
import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Profile from "../../Profile";
import AuthButtons from "../../AuthButtons";
import Link from "next/link";

export default function PhoneNavTest({ linkArray, hamDrop  }: any) {
  const [openNav, setOpenNav] = useState(false);

//   const hamDrop = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openNav) return;

    const handleClick = (e: any) => {
      if (hamDrop.current && !hamDrop.current.contains(e.target)) {
        setOpenNav(false);
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [openNav]);

  return (
    <div ref={hamDrop} className="w-1/2 relative">
        <button onClick={() => setOpenNav(!openNav)}>
          <RxHamburgerMenu className="h-8 w-8 text-white" />
        </button>
        {openNav && (
          <div className="w-full left-0 right-0 bg-[#c05000] absolute flex flex-col justify-center items-center rounded-xl rounded-tl-none py-2 text-white gap-2">
            {linkArray?.map((l: any, index: number) => {

              return (
                <Link key={index} href={l.link}>{l.text}</Link>
              )
            })}
          </div>
        )}
      </div>
  );
}
