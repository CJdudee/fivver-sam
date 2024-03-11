import { Inknut_Antiqua, Roboto_Serif } from "next/font/google";
import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
import HomePageTop from "./homepage/HomePageTop";
import WhatMakesDifferent from "./homepage/WhatMakesDifferent";
import { SiGoogleclassroom, SiGooglemeet } from "react-icons/si";
import {
  FaBookmark,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import PlanPackagesSlider from "./homepage/PlanPackagesSlider";
import { K2D } from "next/font/google";
import BackgroundTest from "./homepage/BackgroundTest";
import Image from "next/image";
import WhatWeStandFor from "./homepage/WhatWeStandFor";
import Link from "next/link";
import { serverUser } from "../lib/serverAuth";
import LineBg from "./homepage/TopHomeBg/LineBg";
import DifferentLine from "./homepage/TopHomeBg/DifferentLine";

const k2 = K2D({ subsets: ["latin"], weight: "800" });

export default async function BookHomePage({ pricePackages }: any) {

  const user = await serverUser()

  return (
    <main className="h-full">
      <div
        className={`h-[450px] md:h-[850px] bg-gradient-to-b relative px-2 md:px-6 pt-4 md:pt-12 pb-8  lg:p-24 lg:px-8 lg:pt-12 lg:pb-24 from-[#202020] via-[#202020] to-[#202020] overflow-hidden  `}
      >
        <HomePageTop />
        {/* <div className=' bg-slate-400 h-full rounded-full absolute top-0 left-0 right-0' /> */}
        
        
        {/* <BackgroundTest /> */}
        <LineBg />
        {/* <DifferentLine /> */}
        {/* <div className=" h-5/6 my-auto top-0 bottom-0 rounded-full w-[7%] bg-orange-300 absolute" /> */}
      </div>

      <div className=" text-center bg-white h-full w-full pt-32 ">
        <p className="text-3xl font-bold">Why choose us?</p>
        <p className="mx-auto w-3/4 md:w-1/2 lg:w-1/5 mt-1 text-sm">
          {
            "...even more reasons"
          }
        </p>
        {/* <p className="mx-auto w-3/4 md:w-1/2 lg:w-1/5 mt-1 text-sm">
          {
            " Here's are reasons that make us special. This is a journey and we will be here along the way "
          }
        </p> */}

        <div className="flex flex-col md:flex-row  gap-2 w-4/5 md:w-[95%] lg:w-5/6 mx-auto items-center h-full   mt-6 md:h-[425px]">
          <div className="flex flex-col md:grid grid-rows-2 md:w-2/5  gap-2 h-full w-full">
            <WhatMakesDifferent
              mainText="Proficiency"
              emoji={["🖥️", "📝"]}
              bottomText="Your teacher is native German speaker"
            />
            <WhatMakesDifferent
              mainText="Dedicated"
              emoji={["👨🏻‍🏫"]}
              bottomText={
                "Your own personal teacher, following you each step of the way"
              }
            />
          </div>

          <div className="bg-[#F5F5F5] h-full w-full md:w-1/5 items-stretch rounded-xl">
            {/* <p className=" h-[100%]">hey</p> */}
            <WhatMakesDifferent
              mainText="Expertise"
              emoji={["🎓", "🏫"]}
              bottomText="Your teacher has a university degree in German language"
              flex={true}
            />
          </div>
          <div className="bg-[#F5F5F5] h-full w-full md:w-1/5 items-stretch rounded-xl">
            {/* <p className=" h-[100%]">hey</p> */}
            <WhatMakesDifferent
              mainText="Certification"
              emoji={["🅰️"]}
              bottomText="Up to date on exam preparation A1-C2"
              flex={true}
            />
          </div>

          <div className=" flex flex-col md:grid grid-rows-2 w-full md:w-2/5 h-full  gap-2">
            <WhatMakesDifferent
              mainText="Personal"
              emoji={["💛"]}
              bottomText="We are a small team of experts, but we are big on personal touch"
            />
            <WhatMakesDifferent
              mainText="Flexible"
              emoji={["🗓️"]}
              bottomText="Reschedule, cancel, or anything in between – available up to 24 hours in advance"
              // bottomText="From our reschedule/cancel policy to anything you need, your SprachGeist is there for you"
            />
            {/* <p className="bg-[#F5F5F5] rounded-xl">hey</p>
                <p className="bg-[#F5F5F5] rounded-xl">hey</p> */}
          </div>
        </div>
      </div>

      <div className="text-center bg-white pt-32">
        <p className="text-3xl font-bold">Why choose us?</p>
        <p className="mx-auto w-4/5 md:w-3/5 lg:w-2/5 mt-1 text-sm">
          {" "}
          We believe in comfort all the way through your learning process
        </p>
        <div className="flex flex-col md:flex-row  gap-4 w-4/5 mx-auto items-center  mt-6 justify-center">
          <div className="bg-[#F5F5F5] rounded-xl flex flex-col p-4 gap-8 h-full w-full md:w-2/4">
            <p className="font-bold text-2xl h-1/5">Easy</p>
            <p className="text-sm  w-4/5 mx-auto text-center  h-1/5 font-bold">
              {" "}
              We use Google Meet © and Google Classroom ©
            </p>
            <p className=" text-7xl  h-3/5 flex items-center justify-center  ">
              {" "}
              👨🏽‍🏫 <SiGooglemeet className="text-orange-700 w-28 h-24" />
              {/* <SiGoogleclassroom className=" text-yellow-700" /> */}
            </p>
          </div>
          <div className=" rounded-xl flex flex-col gap-4 h-full w-full md:w-2/4 ">
            <div className="h-1/2 w-full bg-[#F5F5F5] rounded-xl p-4">
              <p className="font-bold text-2xl h-1/3">Available</p>
              <p className="font-bold h-1/3 text-xl flex justify-center items-center gap-2.5">
                from <span className="text-3xl">8 am</span> to{" "}
                <span className="text-3xl">10 pm</span>
              </p>
              <p className="h-1/3 flex justify-center items-center font-bold text-2xl">
                7 days a week
              </p>
            </div>
            <div className="h-1/2 w-full bg-[#F5F5F5] rounded-xl p-4">
              <p className="font-bold text-2xl h-1/3 ">Adaptable</p>
              <div className=" w-full h-2/3 flex flex-col md:flex-row gap-4 md:gap-4 mt-4 ">
                <div className=" w-full md:w-1/4 h-full flex justify-center items-center">
                  <p className=" text-7xl">🤹🏻‍♂️</p>
                </div>
                <div className="h-full w-full md:w-3/4 text-center font-bold text-sm md:pl-1 ">
                  <p>
                    Time you purchase is yours to spend as fast or as slow as
                    you want within 1 year (but our “Flexible” policy applies
                    here too, so just contact us).
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F5F5F5] rounded-xl flex flex-col p-4 gap-8 h-full w-full md:w-2/4">
            <p className="font-bold text-2xl h-1/5">English</p>
            <p className=" text-6xl  h-3/5 flex items-center justify-center  ">
              {" "}
              🌎 ✍🏻
            </p>
            <p className="text-sm  w-4/5 mx-auto text-center  h-1/5 font-bold">
              {" "}
              All teachers speak English
            </p>
          </div>
        </div>
      </div>

      <div className=" h-max w-full pt-32 relative overflow-hidden z-0 ">
        <div className="w-full h-3/4 absolute bg-white top-0 -z-[0]" />
        <div className="w-full h-1/4 absolute bg-[#313131] bottom-0 -z-0" />
        <div className="z-40">
          <PlanPackagesSlider pricePackages={pricePackages} user={user} />
        </div>
      </div>

      {/* <div className="bg-[#313131] pt-32 pb-16 text-white font-semibold text-center">
          <WhatWeStandFor />
      </div> */}

      <div className="flex gap-20 justify-center items-center pt-32 bg-[#313131] text-white">
        <Link href={""} className=" opacity-50">
          Home
        </Link>
        <Link href={"/about"} className=" opacity-50">
          About Us
        </Link>
        <Link href={"/contact"} className=" opacity-50">
          Contact Us
        </Link>
        {/* <p>Home</p> */}
      </div>

      <div className="bg-[#313131]">
        <div className=" py-4 flex justify-center gap-4 w-1/2 mx-auto">
          <FaFacebook className="w-10 h-10 text-blue-700 bg-white text-clip rounded-full" />
          <FaInstagram className="w-10 h-10 text-white bg-gradient-to-tr from-yellow-300 via-red-500 to-purple-600 rounded-full p-1" />
          <FaWhatsapp className="w-10 h-10 text-white bg-green-600 rounded-full p-1" />
        </div>
      </div>

      <div className="bg-[#313131] pt-32"></div>
    </main>
  );
}
