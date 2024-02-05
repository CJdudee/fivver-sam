"use client";

import { newTeacher } from "@/actions/createTeacher";
import React, { useState } from "react";
import Select from "react-select";

export default function CreateTeacher() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

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

  const onSubmit = async () => {
    const userData = {
      username,
      password,
      email,
      roles,
    };

    await newTeacher(userData);
  };

  return (
    <div className="h-full min-h-full flex items-center justify-center ">
      <form
        className="flex justify-evenly flex-col items-center bg-black w-full md:w-2/3 rounded-xl mx-auto p-4 h-2/3"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-8 w-full ">
          <div className="flex w-full flex-col justify-center items-center">
            <p className="text-white text-center font-bold mb-1">Username</p>
            <input
              value={username}
              className="rounded-full pl-2 w-2/4 " onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <p className="text-white text-center font-bold mb-1">Password</p>
            <input
              value={password}
              className="rounded-full pl-2 w-2/4 " onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <p className="text-white text-center font-bold mb-1">Email - optional</p>
            <input value={email} className="rounded-full pl-2 w-2/4 " onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 w-full flex justify-center md:w-1/2">
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
        </div>
        <div className="block">
          <button className="text-black bg-white px-8 py-0.5 rounded-full font-semibold">Submit</button>
        </div>
      </form>
    </div>
  );
}
