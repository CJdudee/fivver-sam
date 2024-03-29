'use client'
// import React from 'react'

import React, { useEffect, useRef, useState } from "react";
import { CgArrowLeft, CgArrowRight, CgCheck } from "react-icons/cg";


export default function FlatUserNavBar({ setTab, tab }: any) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sideRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!isOpen || !sideRef) return;
    
        const handleClick = (e: any) => {
          if (sideRef.current && !sideRef.current.contains(e.target)) {
            setIsOpen(false);
          }
        };
    
        window.addEventListener("mousedown", handleClick);
    
        return () => {
          window.removeEventListener("mousedown", handleClick);
        };
      }, [isOpen]);
  
    return (
      <>
        <button
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
  
        <div
        ref={sideRef}
          className={`
             bg-white shadow-md h-3/4 md:h-full rounded-r-3xl absolute
            transition-all duration-200 ${isOpen ? "block" : "hidden"}
          `}
        >
          <div className="flex items-center justify-between p-4 ">
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
          </div>
          <nav className="flex flex-col justify-evenly items-center h-full space-y-2 px-4 py-4">
            <button
              type="button"
              className={`
                flex items-center justify-between w-full px-4 py-2 rounded-md
                font-medium text-gray-700 hover:bg-gray-200 hover:text-orange-600
                ${tab === "" ? "text-orange-600" : ""}
              `}
              onClick={() => setTab("")}
            >
              <span>Previous Classes</span>
              {tab === "" && <CgCheck className="h-5 w-5 text-orange-600 ml-2" />}
            </button>
            <button
              type="button"
              className={`
                flex items-center justify-between w-full px-4 py-2 rounded-md
                font-medium text-gray-700 hover:bg-gray-200 hover:text-orange-600
                ${tab === "token" ? "text-orange-600" : ""}
              `}
              onClick={() => setTab("token")}
            >
              <span>Purchase History</span>
              {tab === "token" && <CgCheck className="h-5 w-5 text-orange-600 ml-2" />}
            </button>
            <button
              type="button"
              className={`
                flex items-center justify-between w-full px-4 py-2 rounded-md
                font-medium text-gray-700 hover:bg-gray-200 hover:text-orange-600
                ${tab === "expired" ? "text-orange-600" : ""}
              `}
              onClick={() => setTab("expired")}
            >
              <span>Expired Tokens</span>
              {tab === "expired" && <CgCheck className="h-5 w-5 text-orange-600 ml-2" />}
            </button>
          </nav>
        </div>
      </>
    );
  }
  
