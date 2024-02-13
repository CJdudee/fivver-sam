"use client";

import { newAdmin, newUser } from "@/actions/adminCreate";
import { newTeacher } from "@/actions/createTeacher";
import { errorToast, susToast } from "@/app/lib/react-toast";
import React, { useState } from "react";
import Select from "react-select";

export default function CreateTeacher() {
  const [options, setOptions] = useState(0)
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userData = {
      username,
      password,
      email,
      roles,
    };

    if(options == 0) {

      const createdUser = await newUser(userData)

      if(!createdUser) return errorToast()

      susToast(createdUser as string)

    }
    if(options == 1) {

      const createdTeacher = await newTeacher(userData);

      if(!createdTeacher) return errorToast()

      susToast(createdTeacher as string)

    }
    if(options == 2) {

      const createdAdmin = await newAdmin(userData);

      if(!createdAdmin) return errorToast()

      susToast(createdAdmin as string)

    }

    setUsername('')
    setPassword('')
    setRoles([])
    setEmail('')


    
  };

  return (
    <div className="h-full min-h-full flex flex-col items-center justify-center ">
      <div className="pri w-full md:w-2/3 py-2  rounded-t-xl flex justify-evenly">
        <button onClick={() => setOptions(0)} className={`${options == 0 && 'text-gray-400'} font-bold text-xs sm:text-lg transition-colors duration-300`}>Create User</button>
        <button onClick={() => setOptions(1)} className={`${options == 1 && 'text-gray-400'} font-bold text-xs sm:text-lg transition-colors duration-300`}>Create Teacher</button>
        <button onClick={() => setOptions(2)} className={`${options == 2 && 'text-gray-400'} font-bold text-xs sm:text-lg transition-colors duration-300`}>Create Admin</button>
      </div>
      <form
        className="flex justify-around flex-col items-center pri text-black w-full md:w-2/3 rounded-b-xl mx-auto p-4 h-2/3"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="flex flex-col gap-8 w-full ">
          {options == 0 && <p className="text-center text-2xl font-extrabold -mb-4">Create New User</p>}
          {options == 1 && <p className="text-center text-2xl font-extrabold -mb-4">Create New Teacher</p>}
          {options == 2 && <p className="text-center text-2xl font-extrabold -mb-4">Create New Admin</p>}
          <div className="flex w-full flex-col justify-center items-center">
            <p className=" text-center font-bold mb-1 text-2xl ">Username</p>
            <input
              value={username}
              className="rounded-full pl-2 w-4/5 md:w-2/4 bg-[#83838354] py-0.5 text-center " onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <p className=" text-center font-bold mb-1 text-2xl ">Password</p>
            <input
              value={password}
              className="rounded-full pl-2 w-4/5 md:w-2/4 bg-[#83838354] py-0.5 text-center " onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <p className=" text-center font-bold mb-1 text-2xl ">Email - optional</p>
            <input value={email} className="rounded-full pl-2 w-4/5 md:w-2/4 bg-[#83838354] py-0.5 text-center " onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        {/* <div className="mt-4 w-full flex justify-center md:w-1/2">
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
        </div> */}
        <div className="block">
          <button className="text-black bg-white px-8 py-0.5 rounded-full font-semibold outline-1 outline-black hover:outline-4 outline transition-all duration-150">Submit</button>
        </div>
      </form>
    </div>
  );
}
