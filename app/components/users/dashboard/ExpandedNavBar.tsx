'use client'
// import React from 'react'

import React, { useEffect, useRef, useState } from "react";
import { CgArrowLeft, CgArrowRight, CgCheck } from "react-icons/cg";


export default function ExpandedNavBar({ setTab, tab }: any) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sideRef = useRef<HTMLDivElement | null>(null)

    // useEffect(() => {
    //     if (!isOpen || !sideRef) return;
    
    //     const handleClick = (e: any) => {
    //       if (sideRef.current && !sideRef.current.contains(e.target)) {
    //         setIsOpen(false);
    //       }
    //     };
    
    //     window.addEventListener("mousedown", handleClick);
    
    //     return () => {
    //       window.removeEventListener("mousedown", handleClick);
    //     };
    //   }, [isOpen]);
  
    return (
      <div>
        
        <div
        ref={sideRef}
          className={`
              shadow-md h-3/4 md:h-full rounded-r-3xl flex
            transition-all duration-200 ${isOpen ? "block" : "hidden"}
          `}
        >
         
          <nav className="flex w-full  justify-evenly items-center  px-4 py-4">
            <button
              type="button"
              className={`
                flex items-center justify-center w-full px-4 py-2 rounded-md
                font-medium  md:hover:bg-gray-200 active:bg-gray-200 hover:text-orange-600
                ${tab === "" ? "text-orange-600" : "text-white"}
              `}
              onClick={() => setTab("")}
            >
              <span>Completed Classes</span>
              {tab === "" && <CgCheck className="h-5 w-5 text-orange-600 ml-2" />}
            </button>
            <button
              type="button"
              className={`
                flex items-center justify-center w-full px-4 py-2 rounded-md
                font-medium text-gray-700 md:hover:bg-gray-200 active:bg-gray-200 hover:text-orange-600
                ${tab === "tokenHistory" ? "text-orange-600" : "text-white"}
              `}
              onClick={() => setTab("tokenHistory")}
            >
              <span>Purchase History</span>
              {tab === "tokenHistory" && <CgCheck className="h-5 w-5 text-orange-600 ml-2" />}
            </button>
            <button
              type="button"
              className={`
                flex items-center justify-center w-full px-4 py-2 rounded-md
                font-medium text-gray-700 md:hover:bg-gray-200 active:bg-gray-200 hover:text-orange-600
                ${tab === "token" ? "text-orange-600" : "text-white"}
              `}
              onClick={() => setTab("token")}
            >
              <span>Current Tokens</span>
              {tab === "token" && <CgCheck className="h-5 w-5 text-orange-600 ml-2" />}
            </button>
          </nav>
        </div>
      </div>
    );
  }
  


{/* <div className="flex items-center justify-between p-4 ">
  <h2 className="text-lg font-semibold text-gray-700">Navigation</h2>
  <button
    type="button"
    className="
      focus:outline-none focus:ring-2 focus:ring-offset-gray-200 focus:ring-white
      hover:bg-gray-200 rounded-full p-2
    "
    onClick={toggleSidebar}
  >
    <CgArrowLeft className="h-6 w-6 text-gray-500" />
  </button>
</div> */}


{/* <button
    type="button"
    className={`
        z-30 flex items-center justify-center p-2 rounded-r-full w-6 absolute  
      bg-white text-black hover:bg-gray-800 transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-gray-700 focus:ring-white
      ${isOpen ? "hidden" : ""}
    `}
    onClick={toggleSidebar}
  >
    <CgArrowRight className="h-7 w-7" />
  </button>
*/}