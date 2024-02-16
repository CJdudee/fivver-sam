import React, { useState } from "react";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

export default function SideBarNav({ setTab, tab }: any) {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        className={`${
          hide && "hidden"
        } w-1/4  h-full min-h-[88vh] bg-gray-300 flex flex-col md:gap-8 justify-between md:py-24 text-xs md:px-2 sticky  top-0 md:hidden  `}
      >
        
        <div className="  fixed left-16 ">
          <button onClick={() => setHide(!hide)}>
            <CgArrowLeft className="pl-2 h-7 w-7 text-white" />
          </button>
        </div>
      
        <button
          onClick={() => setTab("")}
          className=" active:bg-gray-800 rounded-2xl font-extrabold w-full h-full active:text-white transition-all duration-500"
        >
          Previous Classes
        </button>
        <button
          onClick={() => setTab("token")}
          className=" active:bg-gray-800 rounded-2xl font-extrabold w-full h-full active:text-white transition-all duration-500"
        >
          Purchase History
        </button>
        <button
          onClick={() => setTab("")}
          className=" active:bg-gray-800 rounded-2xl font-extrabold w-full h-full active:text-white transition-all duration-500"
        >
          Expired Tokens
        </button>
      </div>

      {hide && (
        <div className="  fixed md:hidden ">
          <button onClick={() => setHide(!hide)}>
            <CgArrowRight className="pl-2 h-7 w-7 text-white" />
          </button>
        </div>
      )}

      <div className="w-1/4 h-full min-h-[88vh] bg-gray-300 md:flex flex-col md:gap-8 justify-between md:py-24 text-xs px-2 sticky  top-0 hidden rounded-r-xl my-4 ">
        <button
          onClick={() => setTab("")}
          className=" hover:bg-gray-800 rounded-2xl font-extrabold w-full h-full hover:text-white transition-all duration-500 text-xl"
        >
          Previous Classes
        </button>
        <button
          onClick={() => setTab("token")}
          className=" hover:bg-gray-800 rounded-2xl font-extrabold w-full h-full hover:text-white transition-all duration-500 text-xl"
        >
          Purchase History
        </button>
        <button
          onClick={() => setTab("")}
          className=" hover:bg-gray-800 rounded-2xl font-extrabold w-full h-full hover:text-white transition-all duration-500 text-xl"
        >
          Expired Tokens
        </button>
      </div>
    </>
  );
}
