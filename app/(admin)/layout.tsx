import React from "react";
import Navbar from "../components/Navbar";
import AdminNavBar from "../components/AdminNavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavBar />
      <div className="bg-gradient-to-b from-[#242424] via-[#3D3D3D] to-[#3D3D3D]">
        {children}
      </div>
    </>
  );
}
