import { Inknut_Antiqua } from "next/font/google";
import Image from "next/image";
import React from "react";
const inknut = Inknut_Antiqua({ subsets: ["latin-ext"], weight: "600" });

export default function BookTwo() {
  return (
    <>
      <Image src={'/bookPicTwo.svg'} alt="Book Pic" fill className=" rounded-md flex shadow-sm w-2xl drop-shadow-sm  text-center md:mt-8 pt-2 absolute ">
      
      </Image>
      <Image src={'/bookFilter.svg'} alt="Book Pic" fill className=" rounded-md flex shadow-2xl w-2xl drop-shadow-2xl  text-center md:mt-4  absolute md:p-10 py-13 opacity-10 md:pt-7 pb-14 ">
      
      </Image>
    </>
  );
}
