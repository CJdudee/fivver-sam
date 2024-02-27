"use client";

import { newAdmin, newUser } from "@/actions/adminCreate";
import { newTeacher } from "@/actions/createTeacher";
import { errorToast, susToast } from "@/app/lib/react-toast";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Select from "react-select";

export default function CreateTeacher() {
  const [options, setOptions] = useState<number | null>(0);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [username, setUsername] = useState("");


  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  const [isPwdVis, setIsPwdVis] = useState(false);

  const roleSelect = [
    { value: "user", label: "user" },
    { value: "teacher", label: "teacher" },
    { value: "admin", label: "admin" },
  ];

  const handleRole = (selectedOption: any) => {
    console.log(roles);
    console.log(selectedOption);
    setRoles(
      selectedOption.map((s: any) => {
        return s.value;
      })
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (options == null) return;

    const userData = {
      firstName,
      lastName,
      password,
      email,
      roles,
    };

    if (options == 0) {
      const createdUser: any = await newUser(userData);

      if (!createdUser) return errorToast();

      if(createdUser.error) return errorToast(createdUser.error)

      susToast(createdUser as string);
    }
    if (options == 1) {
      const createdTeacher: any = await newTeacher(userData);

      if (!createdTeacher) return errorToast();

      if(createdTeacher.error) return errorToast(createdTeacher.error)

      susToast(createdTeacher as string);
    }
    if (options == 2) {
      const createdAdmin: any = await newAdmin(userData);

      if (!createdAdmin) return errorToast();

      if(createdAdmin.error) return errorToast(createdAdmin.error)

      susToast(createdAdmin as string);
    }

    // setUsername("");
    setFirstName('')
    setLastName('')
    setPassword("");
    setRoles([]);
    setEmail("");
    setOptions(null);
  };

  return (
    <div className=" flex flex-col items-center justify-center h-fit min-h-full">
      <div className="max-w-lg bg-slate-200 shadow-md rounded-lg px-8 py-4 w-full h-2/3 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-black  text-center mb-8 w-full">
          Create{" "}
          {options === null
            ? "User"
            : options === 0
            ? "User"
            : options === 1
            ? "Teacher"
            : "Admin"}
        </h2>

        <form onSubmit={onSubmit} className="w-full">
          <div className="space-y-4">
            <div className="flex flex-col mb-4">
              <label className="text-black  font-bold mb-2">First Name:</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-sky-500 focus:ring-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-black  font-bold mb-2">Surname:</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-sky-500 focus:ring-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-black  font-bold mb-2">Password:</label>
              <div className="flex justify-end items-end relative">
                {!isPwdVis ? (
                  <FaEye
                    className={` cursor-pointer absolute `}
                    onClick={() => setIsPwdVis(!isPwdVis)}
                  />
                ) : (
                  <FaEyeSlash
                    className={` cursor-pointer absolute `}
                    onClick={() => setIsPwdVis(!isPwdVis)}
                  />
                )}
              </div>
              <input
                type={`${isPwdVis ? "text" : "password"}`}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-sky-500 focus:ring-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <i onClick={() => setIsPwdVis(!isPwdVis)} />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-black  font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-sky-500 focus:ring-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-black  font-bold mb-2">Roles:</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`text-black bg-white px-4 py-2 rounded-full font-semibold ${
                    roles.includes("user")
                      ? "bg-gradient-to-l from-[#E35D5B] to-[#D9643A] text-white"
                      : ""
                  } hover:bg-gradient-to-l from-[#E35D5B] to-[#D9643A] transition-all duration-300`}
                  onClick={() => {
                    if (!roles.includes("user")) {
                      setRoles(["user"]);
                      setOptions(0);
                    } else {
                      setRoles(roles.filter((role) => role !== "user"));
                      setOptions(null);
                    }
                  }}
                >
                  User
                </button>
                <button
                  type="button"
                  className={`text-black bg-white px-4 py-2 rounded-full font-semibold ${
                    roles.includes("teacher")
                      ? "bg-gradient-to-l from-[#E35D5B] to-[#D9643A] text-white"
                      : ""
                  } hover:bg-gradient-to-l from-[#E35D5B] to-[#D9643A] transition-all duration-300`}
                  onClick={() => {
                    if (!roles.includes("teacher")) {
                      setRoles(["teacher"]);
                      setOptions(1);
                    } else {
                      setRoles(roles.filter((role) => role !== "teacher"));
                      setOptions(null);
                    }
                  }}
                >
                  Teacher
                </button>
                <button
                  type="button"
                  className={`text-black bg-white px-4 py-2 rounded-full font-semibold ${
                    roles.includes("admin")
                      ? "bg-gradient-to-l from-[#E35D5B] to-[#D9643A] text-white"
                      : ""
                  } hover:bg-gradient-to-l from-[#E35D5B] to-[#D9643A] transition-all duration-300`}
                  onClick={() => {
                    if (!roles.includes("admin")) {
                      setRoles(["admin"]);
                      setOptions(2);
                    } else {
                      setRoles(roles.filter((role) => role !== "admin"));
                      setOptions(null);
                    }
                  }}
                >
                  Admin
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full  rounded-full py-1 bg-white hover:text-gray-500 font-semibold"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

{
  /* <div className="mt-4 w-full flex justify-center md:w-1/2">
<Select
  classNames={{
    clearIndicator: () => "",
    container: () =>
      "text-black w-2/3 md:w-full lg:w-full text-center   ",
    indicatorsContainer: () => " ",
    control: () => "bg-white flex p-1 rounded-lg gap-4 pl-2   ",
    menu: () => "rounded-lg mt-1 ",
    menuList: () => "bg-white rounded-md text-md ",
    dropdownIndicator: () => "rounded-lg ",
    valueContainer: () =>
      "rounded-lg text-black text-lg font-semibold   ",
    group: () => "text-white bg-slate-300 ",
    option: () => "p-1  hover:bg-slate-100",
    input: () => "",
    placeholder: () => "text-black text-md",
    singleValue: () => "",
  }}
  isMulti
  unstyled
  isSearchable={false}
  options={roleSelect}
  onChange={handleRole}
  className=" text-sm "
  placeholder={"Pick User's Roles"}
  classNamePrefix="unstyled"
/>
</div> */
}
