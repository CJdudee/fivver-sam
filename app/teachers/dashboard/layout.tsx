import Navbar from "@/app/components/Navbar";
import TeacherNavbar from "@/app/components/teachers/TeacherNavbar";
import React from "react";
// import Navbar from '../components/Navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TeacherNavbar />
      <div className="backgroundColorWave">
        {children}
      </div>
    </>
  );
}
