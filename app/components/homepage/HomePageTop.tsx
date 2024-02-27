import { Inknut_Antiqua } from "next/font/google";
import React from "react";
import { LuBookOpen } from "react-icons/lu";
import BookText from "./BookText";
import BookPic from "./BookPic";
import BookTwo from "./book/BookTwo";

const inknut = Inknut_Antiqua({ subsets: ["latin-ext"], weight: "400" });

export default function HomePageTop() {
  return (
    <div className="bg-white w-full md:w-4/5 mx-auto md:h-full rounded-xl flex flex-col-reverse lg:flex-row z-20 h-full  ">
      <div className="bg-white w-full h-full  lg:h-full pt-4 lg:w-[55%]   pl-5 px-4  flex flex-col justify-center items-center z-30 rounded-l-xl ">
        <BookText />
      </div>
      <div className="bg-white w-full hidden  h-1/2 lg:h-full   lg:w-[50%]    py-4 md:py-4 px-12 md:px-32 lg:px-4 z-20 rounded-r-xl relative lg:flex justify-center items-center ">
        {/* <BookPic /> */}
        <BookTwo />
      </div>
    </div>
  );
}
