import React from "react";
import SignUpForm from "./SignUpForm";
import LogoLink from "@/app/components/users/navbar/LogoLink";

export default function Page() {
  return (
    <div className=" rounded h-2/3 w-full  p-4 flex flex-col items-center justify-center">
      <div className="flex justify-start w-1/4 mr-auto -ml-4">
        <LogoLink />
      </div>
      <div className=" relative w-1/3  text-center ">
        <p className=" left-0 right-0  absolute  bottom-1  text-center  text-2xl font-bold text-transparent bg-gradient-to-l 
        from-[#D9643A] to-[#E35D5B] 
        
        inline-block bg-clip-text ">
          New Account
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
