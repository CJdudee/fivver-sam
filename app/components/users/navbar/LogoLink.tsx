import { K2D } from 'next/font/google';
import Link from 'next/link'
import React from 'react'
import { FaBookmark } from 'react-icons/fa'
const k2 = K2D({ subsets: ["latin"], weight: "800" });

export default function LogoLink() {
  return (
    <Link href={'/'} className=" md:px-[16%] w-fit">
          <div className=" rounded-b-xl bg-gradient-to-r from-[#D9643A] to-[#E35D5B] hover:bg-gradient-to-br transition-all duration-1000 absolute w-fit md:w-[6%] min-h-fit  top-0 flex flex-col min-w-fit active:w-[10%]  ">
            <div className="w-full ">
              <FaBookmark className="text-white ml-auto mr-1" />
            </div>
            <div
              className={` ${k2.className} h-full px-1 text-xl flex flex-col font-extrabold text-white gap-2 `}
            >
              <p className="w-full text-center text-2xl">SPRACH</p>
              <p className="w-full text-center text-2xl -mt-4">GEIST</p>
            </div>
          </div>
        </Link>
  )
}
