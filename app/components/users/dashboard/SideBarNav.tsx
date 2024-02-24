import React, { useState } from "react";
import { CgArrowLeft, CgArrowRight, CgCheck } from "react-icons/cg";

export default function SideBarNav({ setTab, tab }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        type="button"
        className={`
          fixed top-16 left-0 z-50 flex items-center justify-center p-2 rounded-full
          bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-gray-700 focus:ring-white
          ${isOpen ? "hidden" : ""}
        `}
        onClick={toggleSidebar}
      >
        <CgArrowRight className="h-6 w-6" />
      </button>

      <div
        className={`
          fixed top-16 left-0 z-40 w-64 overflow-y-auto bg-white shadow-md
          transition-all duration-200 ${isOpen ? "block" : "hidden"}
        `}
      >
        <div className="flex items-center justify-between p-4">
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
        <nav className="flex flex-col space-y-2 px-4 py-4">
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
