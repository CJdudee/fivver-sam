"use client";
import { updateUser } from "@/actions/userProfile";
import React, { useState } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { errorToast, susToast } from "../lib/react-toast";

export default function UserProfile({ user }: any) {
  // const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const saveUser = async () => {
    if(!firstName) return 

    const userData = {
      firstName,
      lastName,
      email,
      _id: user._id,
    };

    const saved = await updateUser(userData);

    if (!saved) return errorToast();

    if(saved.error) {
       errorToast(saved.error)
       setEmail(user.email)
       return
    }

    susToast(saved.msg as string);

    console.log("save");
  };

  return (
    <div className="text-center w-full md:w-1/2 flex flex-col justify-center items-center gap-8 outline-1 outline outline-[#c5c5c523] rounded-xl py-8 h-2/3  ">
      <div className="flex flex-col  justify-center items-center">
        <label
          htmlFor="firstName"
          className="text-2xl font-bold text-white mb-1"
        >
          First Name
        </label>
        <input
          required
          id="firstName"
          className="rounded-full  text-center py-1 text-lg"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
        />
      </div>
      <div className="flex flex-col  justify-center items-center">
        <label
          htmlFor="lastName"
          className="text-2xl font-bold text-white mb-1"
        >
          Surname
        </label>
        <input
          required
          id="lastName"
          className="rounded-full  text-center py-1 text-lg"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
        />
      </div>

      <div className="flex flex-col  justify-center items-center">
        <div className="flex relative w-full">
          <label
            htmlFor="email"
            className="text-2xl font-bold text-white mb-1 w-full"
          >
            Email
          </label>
          <p className="text-xs absolute top-0 right-0 w-1/4 text-white flex ">
            {user.emailVerified == null ? "Email not Verified" : `Verified`}
            {user.emailVerified == null ? (
              <MdCheckBoxOutlineBlank />
            ) : (
              <FcCheckmark />
            )}
          </p>
        </div>
        <input
          required
          id="email"
          className="rounded-full  text-center py-1 text-lg"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>

      <div className="flex flex-col  justify-center items-center">
        <label className="text-2xl font-bold text-white mb-1">Password</label>
        <input
          className="rounded-full  text-center py-1 text-lg"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>

      <button
        onClick={saveUser}
        className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] text-white hover:text-black font-medium px-4 py-0.5 rounded-xl hover:bg-slate-100 transition-all duration-200 hover:shadow-lg hover:shadow-green-100 w-1/4"
      >
        Save
      </button>
    </div>
  );
}
