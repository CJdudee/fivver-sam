"use client";

import { newTeacher } from "@/actions/createTeacher";
import React, { useState } from "react";
import Select from 'react-select'

export default function CreateTeacher() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState<string[]>([])



  const roleSelect = [
    { value: 'teacher', label: 'teacher'},
    { value: 'admin', label: 'admin'}
  ]

  const handleRole = (selectedOption: any) => {
    console.log(roles)
    console.log(selectedOption)
    setRoles(selectedOption.map((s: any) => {
      return s.value
    }))
  }

  const onSubmit = async () => {
    const userData = {
      username, 
      password,
      email,
      roles
    }

    await newTeacher(userData)
  }


  return (
    <div>
      <form className="flex justify-evenly flex-col items-center" onSubmit={onSubmit}>
        <p>Username</p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>Password</p>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <p>email</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <div className="mt-4 w-1/2">

        <Select
          classNames={{
            clearIndicator: () => "",
            container: () =>
            "text-black w-2/3 md:w-full lg:w-full text-center   ",
            indicatorsContainer: () => " ",
            control: () => "bg-white flex p-1 rounded-lg pl-2   ",
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
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
