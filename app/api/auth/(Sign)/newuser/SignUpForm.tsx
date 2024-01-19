"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "authenticated") {
    router.back();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.currentTarget;

    const username = target.elements.namedItem("username") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;

    const data = {
      username: username.value,
      password: password.value,
    };

    try {
        
        const res = await fetch('/api/user', {
            method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
        })

        if(!res.ok) {
            throw new Error('error with post')
        }

    } catch (error) {
        
    }

    router.push('/api/auth/signin')

    // await signIn("credentials", data);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-slate-300 rounded-xl p-4 w-full ">
        <div className="mb-4 text-center  ">
          <label className="text-2xl  " htmlFor="username">
            Username
          </label>

          <div className="mt-2">
            <input
              className="    w-96 lg:w-1/2 rounded-md  pl-2 "
              id="username"
              type="text"
              name="username"
              required
              minLength={3}
            />
          </div>
        </div>

        <div className="mb-4 text-center">
          <label className="text-2xl " htmlFor="password">
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              id="password"
              name="password"
              className="w-96 lg:w-1/2 rounded-md  pl-2"
            />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            className="outline p-2 mt-5 rounded-md hover:bg-gray-300 "
            type="submit"
          >
            LogIn
          </button>
        </div>

        <div className="flex justify-center">
            <button 
            className="bg-slate-300 outline outline-1 shadow-lg drop-shadow-lg hover:drop-shadow-2xl hover:shadow-green-300 transition-all duration-500 outline-gray-400 rounded p-4 w-1/2 flex justify-center " 
            onClick={() => signIn('google')} type="button"> 
            {/* GOODLE */}
            <FcGoogle className="w-9 h-9" />
            </button>
        </div>

        <div className="flow-root mt-4">
          <Link
            href={"/api/auth/signin"}
            className="float-right text-blue-700 hover:text-purple-500"
          >
            Already have an account...
          </Link>
        </div>
      </form>
    </>
  );
}
