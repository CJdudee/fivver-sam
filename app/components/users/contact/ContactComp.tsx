import React from "react";
import { FcClock } from "react-icons/fc";
import { HiClock } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function ContactComp() {
  return (
    <div className="flex flex-col h-[92vh] min-h-[800px] justify-evenly items-center text-white font-semibold">
      <div className="text-2xl text-white text-center font-semibold">
        <p>Want to Contact Us?</p>
        <p className="text-sm mt-2">All of our Infomation is here</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <p className="text-2xl font-semibold">Contact Us by:</p>
        <div className="flex gap-2">
          <IoLocation className="w-7 h-7" />
          <p>Raiffeisenstraße 22, 34121 Kassel, Germany</p>
        </div>
        <div className="flex gap-2">
          <MdEmail className="w-7 h-7" />
          <p>random@random.com</p>
        </div>
        <div className="flex gap-2">
          <HiClock className="w-7 h-7" />
          <p>8am-10pm CET, 7 days a week</p>
        </div>
      </div>

      <div className="flex gap-1">
        <p className="font-bold italic">Launched:</p>
        <p>January 2024</p>
      </div>
    </div>
  );
}
