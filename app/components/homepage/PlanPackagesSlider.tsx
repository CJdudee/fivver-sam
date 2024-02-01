import React from "react";
import SinglePlanPackage from "./SinglePlanPackage";

export default function PlanPackagesSlider() {
  return (
    <div className="  flex gap-2 px-2 md:px-24 h-full md:justify-center overflow-hidden w-[220dvh] md:w-full  ">
      
        <SinglePlanPackage price={10} hours={2} />

        <SinglePlanPackage price={50} hours={5} />
      
      
        <SinglePlanPackage price={100} hours={10} dark={true} value={true} />
      
      
        <SinglePlanPackage price={150} hours={15} />
      
    
        <SinglePlanPackage price={300} hours={30} />
      
      
    </div>
  );
}


{/* <div className="w-1/6 h-full outline-[#C5C5C5] outline-1 outline rounded-xl flex flex-col  pt-6 pb-4">
        <div className=" w-full px-5 ">
          <div className="flex justify-between w-full ">
            <p className="w-1/2 font-[800] text-xl">2 Hours</p>
            <p className="w-1/2 text-end font-[800] text-xl">€00</p>
          </div>
          <p className=" -mt-[0.275rem] font-bold text-gray-400">
            Private Lessons
          </p>
        </div>
        <div className="w-2/3 outline outline-1 outline-[#D1D1D1] rounded-full h-[10%] mx-4 my-5 flex items-center ">
          <p className="w-1/4 text-center text-3xl flex justify-center items-center pb-2">
            +
          </p>
          <p className="w-2/4 text-[#D9643A] text-center font-bold text-xl">
            {" "}
            1 on 1
          </p>
          <p className="w-1/4 text-center text-3xl flex justify-center items-center pb-1">
            -
          </p>
        </div>
        <p className="px-4 text-sm font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>

        <div className="mt-4 px-4">
          <ul className="flex flex-col gap-1.5">
            <div className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full p-1 bg-gray-400" />
              <p className="font-semibold text-xs">Lorem ipsum sit.</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full p-1 bg-gray-400" />
              <p className="font-semibold text-xs">Lorem ipsum sit adsfa;.</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full p-1 bg-gray-400" />
              <p className="font-semibold text-xs">Lorem ipsum sit.</p>
            </div>
          </ul>
        </div>

        <div className="h-full  w-full flex justify-center items-center pt-5">
          <button className="w-3/4 outline-[#C5C5C5] outline outline-1 text-gray-400 text-sm h-2/3 rounded-full font-[1000]">
            Choose plan
          </button>
        </div>
      </div> */}