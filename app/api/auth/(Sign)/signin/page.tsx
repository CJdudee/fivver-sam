import { redirect } from "next/navigation";
import React from "react";
import SignInForm from "./SignInForm";
import LogoLink from "@/app/components/users/navbar/LogoLink";

export default function Page() {
  // redirect('/', )
  return (
    <div className=" min-h-[900px] h-[100vh] w-full p-4 flex items-center justify-center flex-col ">
      <div className="flex justify-start w-1/4 mr-auto">

      <LogoLink />
      </div>
      <div className=" relative w-1/4 text-center ">
        <p className=" left-0 right-0  absolute  bottom-2  text-center  text-2xl font-extrabold text-transparent bg-gradient-to-r from-[#D9643A] to-[#E35D5B] inline-block bg-clip-text ">
          LogIn
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
