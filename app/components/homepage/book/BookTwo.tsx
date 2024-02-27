import { Inknut_Antiqua } from "next/font/google";
import Image from "next/image";
import React from "react";
const inknut = Inknut_Antiqua({ subsets: ["latin-ext"], weight: "600" });

export default function BookTwo() {
  return (
    <>
      {/* <Image src={'/bookPicTwo.svg'} alt="Book Pic" fill className=" rounded-md flex shadow-sm w-2xl drop-shadow-sm  text-center md:mt-8 pt-2 absolute ">
      
      </Image> */}
      {/* <Image src={'/changedBook.svg'} alt="Book Pic" fill className=" rounded-md flex shadow-sm w-2xl drop-shadow-sm  text-center md:mt-8 pt-2 absolute -ml-2 ">
      
      </Image> */}
      {/* <Image src={'/changedBook2.svg'} alt="Book Pic" fill className=" rounded-md flex shadow-sm w-2xl drop-shadow-sm  text-center md:mt-8 pt-2 absolute -ml-5  ">
      
      </Image> */}
      <Image src={'/changedBook3.svg'} draggable={false} alt="Book Picture" fill className=" rounded-md flex shadow-sm w-2xl drop-shadow-sm  text-center md:mt-8 pt-2 absolute -ml-1   ">
      
      </Image>
      
      {/* <Image src={'/bookFilter.svg'} alt="Book Pic" fill className=" rounded-3xl flex shadow-2xl w-2xl drop-shadow-2xl  text-center md:mt-3  absolute md:pb-12 py-13 opacity-5 md:pt-7 pb-14 ">
      
      </Image> */}
    </>
  );
}
