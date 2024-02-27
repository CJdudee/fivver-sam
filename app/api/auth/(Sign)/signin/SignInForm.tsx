"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "authenticated") {
    router.push('/');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.currentTarget;

    // const username = target.elements.namedItem("username") as HTMLInputElement;
    const email = target.elements.namedItem("email") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;

    const data = {
      // username: username.value,
      email: email.value,
      password: password.value,
      redirect: true,
      callbackUrl: "/",
    };

    await signIn("credentials", data);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className=" outline outline-1 outline-[#c5c5c5] rounded-xl py-20 sm:w-1/2 px-4 sm:px-0 xl:px-8 flex flex-col gap-1 ">
        <div className="mb-4 flex flex-col font-bold text-[#f5f5f5] w-full ">
          <label className="text-2xl  text-start w-full sm:w-1/2 mx-auto pl-0.5  " htmlFor="email">
            Email
          </label>

          <div className="mt-2 mx-auto flex w-full sm:w-1/2">
            <input
              className="rounded-md pl-2 py-0.5 w-full bg-[#b4b4b465]  "
              id="email"
              type="text"
              name="email"
              required
              minLength={3}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col font-bold text-[#f5f5f5] w-full">
          <label className="text-2xl  text-start w-full sm:w-1/2 mx-auto pl-0.5 " htmlFor="password">
            Password
          </label>
          <div className="mt-2 mx-auto flex  w-full sm:w-1/2">
            <input
              type="password"
              id="password"
              name="password"
              className=" rounded-md pl-2 py-0.5 w-full bg-[#b4b4b465]"
            />
          </div>
        </div>

        <div className="flex justify-center mb-4 text-[#f5f5f5]">
          <button
            className="outline outline-1 p-2  rounded-md hover:bg-[#b4b4b465] w-full sm:w-1/2 font-extralight transition-colors duration-500 "
            type="submit"
          >
            LogIn
          </button>
        </div>

        <div className="flex justify-center text-[#f5f5f5]">
            <button 
            className="bg-[#b4b4b465] outline outline-1 shadow-lg drop-shadow-lg hover:drop-shadow-2xl hover:shadow-green-300 active:shadow-green-800 transition-all duration-500 outline-gray-400 rounded p-4 w-it flex justify-center items-center font-bold gap-8 " 
            onClick={() => 
            signIn('google')
            // console.log('hey')
            } type="button"> 
            {/* GOODLE */}
            <FcGoogle className="w-8 h-8 text-3xl   rounded-full drop-shadow-xl shadow-md shadow-black" />
            Sign in with Google
            </button>
        </div>

        <div className="flow-root mt-4 w-full sm:w-1/2 mx-auto ">
          <Link
            href={"/api/auth/newuser"}
            className="float-left   font-bold text-gray-400 opacity-80"
          >
            Don’t have an account yet? <span className="text-blue-500 hover:text-purple-500 underline-offset-4 underline ">Sign up here</span>
          </Link>
        </div>
      </form>
    </>
  );
}

//pm2 start npm --name "fivver-sam" -- start
