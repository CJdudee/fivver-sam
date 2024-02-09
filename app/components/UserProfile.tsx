"use client";
import { updateUser } from "@/actions/userProfile";
import React, { useState } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { errorToast, susToast } from "../lib/react-toast";

export default function UserProfile({ user }: any) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const saveUser = async () => {
    const userData = {
      username,
      email,
      _id: user._id,
    };

    const saved = await updateUser(userData);

    if (!saved) return errorToast();

    susToast(saved.msg);

    console.log("save");
  };

  return (
    <div className="text-center w-1/2 flex flex-col justify-center items-center gap-8 outline-1 outline outline-[#c5c5c523] rounded-xl py-8 h-2/3  ">
      <div className="flex flex-col  justify-center items-center">
        <label htmlFor="name" className="text-2xl font-bold text-white mb-1">
          Username
        </label>
        <input
          id="name"
          className="rounded-full  text-center py-1 text-lg"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
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
        className="bg-white px-4 py-0.5 rounded-xl hover:bg-slate-100 transition-all duration-200 hover:shadow-lg hover:shadow-green-100"
      >
        Save
      </button>
    </div>
  );
}
