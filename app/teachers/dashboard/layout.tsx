import Navbar from "@/app/components/Navbar";
import TeacherNavbar from "@/app/components/teachers/TeacherNavbar";
import React from "react";
// import Navbar from '../components/Navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TeacherNavbar />
      <div className=" bg-gradient-to-b from-[#242424] via-[#3D3D3D] to-[#3D3D3D]">
        {children}
      </div>
    </>
  );
}
