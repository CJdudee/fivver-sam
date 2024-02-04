import { Inknut_Antiqua, Roboto_Serif } from "next/font/google";
import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
import HomePageTop from "./homepage/HomePageTop";
import WhatMakesDifferent from "./homepage/WhatMakesDifferent";
import { SiGoogleclassroom } from "react-icons/si";
import {
  FaBookmark,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import PlanPackagesSlider from "./homepage/PlanPackagesSlider";
import { K2D } from "next/font/google";

const k2 = K2D({ subsets: ["latin"], weight: "800" });



export default function BookHomePage() {
  return (
    <main className="h-full">
      <div
        className={`h-[850px] bg-gradient-to-b relative px-6 pt-12 pb-8  lg:p-24 lg:px-8 lg:pt-12 lg:pb-24 from-[#242424] via-[#3D3D3D] to-[#3D3D3D] overflow-hidden  `}
      >
        <HomePageTop />
        {/* <div className=' bg-slate-400 h-full rounded-full absolute top-0 left-0 right-0' /> */}

        {/* <div className=" absolute  bottom-0 h-full w-3/5 left-0 -right-24 top-52  border-[40px] ml-auto rounded-full rounded-b-full border-opacity-80 border-fuchsia-400 z-0 "></div> */}
        <div className=" absolute  bottom-0 h-4/5  w-1/2 left-0 -right-[20%] -top-[55%]  border-[40px] ml-auto rounded-full  border-opacity-80  z-0 flex justify-center items-center ">
          <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto flex justify-center items-center">
            <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto"></div>
          </div>
        </div>
        <div className=" absolute  bottom-0 h-4/5  w-1/2 right-0 -left-[20%] top-[55%]  border-[40px] mr-auto rounded-full  border-opacity-80  z-0 flex justify-center items-center ">
          <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto flex justify-center items-center">
            <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      <div className=" text-center bg-white h-full w-full pt-32 ">
        <p className="text-3xl font-bold">What makes Us different?</p>
        <p className="mx-auto w-3/4 md:w-1/2 lg:w-1/5 mt-1 text-sm">
          {" Here's are reasons that make us special. This is a journey and we will be here along the way "}
          
        </p>

        <div className="flex flex-col md:flex-row  gap-2 w-4/5 mx-auto items-center h-full   mt-8 md:h-[400px]">
          <div className="flex flex-col md:grid grid-rows-2 md:w-2/5  gap-2 h-full w-full">
            <div className="bg-[#F5F5F5] rounded-xl flex flex-col p-4 gap-4">
              <p className="font-bold text-2xl">Proficiency</p>
              <p className="text-5xl h-full "> ✏️👨‍🏫 </p>
              <p className="text-sm h-full w-4/5 mx-auto text-center font-bold ">
                {" "}
                Native German Speaker
              </p>
            </div>
            <WhatMakesDifferent
              mainText="Dedicated"
              emoji={["📕", "🎓"]}
              bottomText={
                "Your own personal teacher, following you each step of the way"
              }
            />
          </div>

          <div className="bg-[#F5F5F5] h-full w-full md:w-1/5 items-stretch rounded-xl">
            {/* <p className=" h-[100%]">hey</p> */}
            <WhatMakesDifferent
              mainText="Expertise"
              emoji={["🏫", "🎩"]}
              bottomText="You Teacher Has a University Degree in German Language"
              flex={true}
            />
          </div>

          <div className=" flex flex-col md:grid grid-rows-2 w-full md:w-2/5 h-full  gap-2">
            <WhatMakesDifferent
              mainText="Personal"
              emoji={["💝"]}
              bottomText="We are a small team of experts, but we are big on personal touch"
            />
            <WhatMakesDifferent
              mainText="Flexible"
              emoji={["📅"]}
              bottomText="From our reschedule/cancel policy to anything you need, your SprachGeist is there for you"
            />
            {/* <p className="bg-[#F5F5F5] rounded-xl">hey</p>
                <p className="bg-[#F5F5F5] rounded-xl">hey</p> */}
          </div>

          {/* <p className="bg-slate-400">hey</p>
            <p className="bg-purple-400 h-20">hey</p>
            <p>hey</p>
            <p>hey</p> */}
        </div>
      </div>

      <div className="text-center bg-white pt-32">
        <p className="text-3xl font-bold">Why choose us?</p>
        <p className="mx-auto w-4/5 md:w-1/5 mt-1 text-sm">
          {" "}
          We believe in comfort all the way through your learning process
        </p>
        <div className="flex flex-col md:flex-row  gap-4 w-4/5 mx-auto items-center  mt-8 justify-center">
          <div className="bg-[#F5F5F5] rounded-xl flex flex-col p-4 gap-8 h-full w-full md:w-2/4">
            <p className="font-bold text-2xl h-1/5">Easy</p>
            <p className="text-sm  w-4/5 mx-auto text-center  h-1/5 font-bold">
              {" "}
              We use Google Meet © and Google Classroom ©
            </p>
            <p className=" text-7xl  h-3/5 flex items-center justify-center  ">
              {" "}
              👨‍🏫 {" "} <SiGoogleclassroom className=" text-yellow-700" />
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
              <div className=" w-full h-2/3 flex flex-col md:flex-row gap-4 md:gap-0 mt-4 ">
                <div className=" w-full md:w-1/4 h-full flex justify-center items-center">
                  <p className=" text-7xl">🤹‍♂️</p>
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
        </div>
      </div>

      <div className=" h-max w-full pt-32 relative overflow-hidden ">
        <div className="w-full h-3/4 absolute bg-white top-0 -z-[0]" />
        <div className="w-full h-1/4 absolute bg-[#313131] bottom-0 -z-0" />
        <div className="z-40">
          <PlanPackagesSlider />
        </div>
      </div>

      <div className="flex gap-20 justify-center items-center pt-32 bg-[#313131] text-white">
        <p className=" opacity-50">Home</p>
        <p className=" opacity-50">About Us</p>
        <p className=" opacity-50">Contact US</p>
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
