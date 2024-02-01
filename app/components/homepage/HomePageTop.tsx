import { Inknut_Antiqua } from 'next/font/google'
import React from 'react'
import { LuBookOpen } from 'react-icons/lu'
import BookText from './BookText'
import BookPic from './BookPic'

const inknut = Inknut_Antiqua({ subsets: ['latin-ext'], weight: '400'})

export default function HomePageTop() {
  return (
    <div className="bg-white w-full md:w-4/5 mx-auto h-full rounded-xl flex flex-col-reverse lg:flex-row">
          <div className=" w-full h-1/2 lg:h-full  lg:w-[50%]  p-12 overflow-scroll lg:overflow-auto ">
            <BookText />
          </div>
          <div className=" w-full h-1/2 lg:h-full   lg:w-[50%]   rounded-xl py-4 md:py-4 px-12 md:px-32 lg:px-4">
            <BookPic />
          </div>
        </div>
  )
}