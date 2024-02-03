import { redirect } from "next/navigation";
import React from "react";
import SignInForm from "./SignInForm";

export default function Page() {
  // redirect('/', )
  return (
    <div className="   h-full w-full p-4 flex items-center justify-center flex-col ">
      <div className=" relative w-1/4 text-center ">
        <p className=" left-0 right-0  absolute  bottom-4  text-center  text-2xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-700 inline-block bg-clip-text ">
          LogIn
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
