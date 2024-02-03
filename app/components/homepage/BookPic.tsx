import { Inknut_Antiqua } from "next/font/google";
import React from "react";
const inknut = Inknut_Antiqua({ subsets: ["latin-ext"], weight: "600" });

export default function BookPic() {
  return (
    <>
      <div className="w-full h-full bg-red-900 rounded-md flex shadow-2xl w-2xl drop-shadow-2xl ">
        <div className="w-1/12 md:w-[5%] h-full  border-r-[2px]  border-black bg-red-950" />
        <div className="w-full h-full flex flex-col justify-center items-center gap-6 pb-8">
          <p
            className={` ${inknut.className} w-full text-2xl text-[#D9643A] font-bold text-center`}
          >
            <span className="block">GERMAN</span>{" "}
            <span className="block">LANGUAGE</span> MADE EASY
          </p>
          <div className="text-center">
            <p className="font-bold">BY</p>
            <p className="font-bold">SPRACHGEIST</p>
          </div>
        </div>
      </div>
    </>
  );
}
