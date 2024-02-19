"use client";

import {
  assignTeacherToUser,
  disableUser,
  removeTeacherFromUser,
} from "@/actions/adminAllUsers";
import { getAllTeacher } from "@/actions/teacherQuery";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize } from "@/utils/helpers";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "react-select";
import AsyncSelect from "react-select/async";

const styleForSelect = {
  clearIndicator: () => "",
  container: () => " text-black font-bold ",
  control: () => "",
  dropdownIndicator: () => "",
  group: () => "",
  groupHeading: () => "",
  indicatorsContainer: () => "",
  indicatorSeparator: () => "",
  input: () => "",
  loadingIndicator: () => "",
  loadingMessage: () => "",
  menu: () => "text-black  text-sm",
  menuList: () => "",
  menuPortal: () => "",
  multiValue: () => "",
  multiValueLabel: () => "",
  multiValueRemove: () => "",
  noOptionsMessage: () => " text-sm",
  option: (styles: any) => `text-black hover:bg-amber-400  text-center py-2 `,
  placeholder: () => "",
  singleValue: () => " text-black",
  valueContainer: () => "",
};

export default function ViewAllUsers({
  foundUserJson,
  foundAssignedJson,
}: any) {
  const [msg, setMsg] = useState("");
  const [turnDialog, setTurnDialog] = useState(false);
  const [idUser, setIdUser] = useState<any>(null);
  const [teacherId, setTeacherId] = useState<any>(null);
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const [asyncSearch, setAsyncSearch] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [filter, setFilter] = useState<any>(undefined);

  const [foundAssigned, setFoundAssigned] = useState(foundAssignedJson);

  const roleSelect = [
    { value: "user", label: "user" },
    { value: "teacher", label: "teacher" },
    { value: "admin", label: "admin" },
  ];

  const handleRole = (selectedOption: any) => {
    console.log(filter);
    // console.log(selectedOption);
    setFilter(
      selectedOption.map((s: any) => {
        return s.value;
      })
    );
  };

  useEffect(() => {
    if (!turnDialog) return dialogRef.current?.close();

    dialogRef.current?.showModal();
  }, [turnDialog]);

  const filterUser = foundUserJson.filter((u: any) => {
    // if (filter == null) return true;

    const trueArray: boolean[] = [];

    if (filter != undefined && filter != "") {
      if (!filter.every((f: any) => u.roles?.includes(f)))
        trueArray.push(false);
      // if (!filter.includes(u.roles)) trueArray.push(false);
    }
    // if(u.roles?.includes(filter)) return true

    if (nameFilter != "") {
      const lowerName = u.username.toLowerCase();

      // if(nameFilter != u.username) trueArray.push(false)
      if (!lowerName.includes(nameFilter.toLowerCase())) trueArray.push(false);
    }

    if (trueArray.includes(false)) return false;

    return true;
  });

  const loadOptions = async (searchValue: string, callback: any) => {
    // const filterTeachers = 'hey hey'

    // const allTeachers =  await getAllTeacher()
    const allTeachers = await fetch(`${process.env.HOSTNAME}/api/teachers`, {
      method: "GET",
    });

    const allTeachersJson = await allTeachers.json();
    console.log(allTeachersJson);

    const filterTeachers = await allTeachersJson.filter((option: any) =>
      option.user.username.toLowerCase().includes(searchValue.toLowerCase())
    );

    console.log(filterTeachers);
    console.log("loaderoptions", searchValue, filterTeachers);

    callback(filterTeachers);
  };

  const handleDisable = async (userId: string) => {
    const result = await disableUser(userId);

    console.log(result);

    if (result.msg) {
      setMsg(result.msg);
    }
  };

  const handleAssignTeacher = async () => {
    // console.log(idUser, teacherId)

    if (!idUser || !teacherId || !teacherId._id) return;

    const assigned = await assignTeacherToUser(idUser._id, teacherId._id);

    if (!assigned) return errorToast();

    susToast(assigned.msg);

    setFoundAssigned(assigned.data);

    setTurnDialog(false);
    setIdUser(null);
    setTeacherId(null);
  };

  const handleRemoveTeacher = async () => {
    // console.log(idUser, teacherId)

    if (!idUser) return;

    const deleted: any = await removeTeacherFromUser(idUser._id);

    if (!deleted) return errorToast();

    susToast(deleted.msg);

    setFoundAssigned((prev: any) => {
      return prev.filter((p: any) => p.user != deleted.data);
    });

    setTurnDialog(false);
    setIdUser(null);
    setTeacherId(null);
  };

  const handleSelect = (selectedOption: any) => {
    console.log(selectedOption);
    console.log(selectedOption._id);
    setTeacherId(selectedOption);
  };

  const asssignTeacherDialog = turnDialog && (
    <dialog
      className=" w-full min-w-full md:min-w-0 md:w-2/3 h-2/3 min-h-[400px] pri  text-black p-4 rounded-xl"
      ref={dialogRef}
    >
      <p className="w-full mt-4  truncate font-bold mb-2">
        Asssign Teacher to {idUser?.username}{" "}
      </p>
      <button
        className=" absolute top-1 right-2 hover:text-red-400 font-bold"
        onClick={() => {
          setTurnDialog(false);
          setIdUser(null);
          setTeacherId(null);
        }}
      >
        X
      </button>

      <div className="  h-1/3">
        <AsyncSelect
          loadOptions={loadOptions as any}
          className="text-sm "
          // value={asyncSearch} onChange={(e) => setAsyncSearch(e.target.value)}
          // styles={{
          //   valueContainer: (styles) => ({...styles, color: '#000', backgroundColor: '#0000'})
          // }}
          getOptionLabel={(option) => option.user.username}
          getOptionValue={(option) => option.user.username}
          placeholder="Please Type Teacher Username"
          // noOptionsMessage={"hey"}
          // noOptionsMessage={{msg: 'f'}}
          classNames={styleForSelect}
          onChange={handleSelect}
        />
      </div>
      <div className="h-1/2 flex flex-col md:flex-row justify-center items-center md:items-end w-full gap-2 ">
        {teacherId && (
          <button
            className="px-6 outline-1 outline hover:outline-4 transition-all duration-150 rounded-full"
            onClick={handleAssignTeacher}
          >
            Assign Teacher to User
          </button>
        )}
        {idUser && foundAssigned.find((c: any) => c.user == idUser._id) && (
          <button
            className="px-6 outline-1 outline hover:outline-4 transition-all duration-150 rounded-full"
            onClick={handleRemoveTeacher}
          >
            Remove Assigned Teacher
          </button>
        )}
      </div>
    </dialog>
  );

  return (
    <div>
      <div className="mb-2 sticky top-[8vh] bg-[#242424]  flex justify-evenly gap-2 pb-2 pt-2 ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="md:w-1/2">Find By Name</p>
          <input
            className="rounded-full text-lg w-4/5 md:w-1/2 text-black pl-2 font-bold"
            onChange={(e) => {
              setNameFilter(e.target.value);
              console.log(nameFilter);
            }}
            value={nameFilter}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="md:w-1/2">Find By Roles</p>
          {/* <input value={filter} className="rounded-full text-lg w-4/5 md:w-1/2 text-black pl-2 font-bold" onChange={(e) => setFilter(e.target.value)} /> */}
          <div className=" w-4/5 flex justify-center ">
            <Select
              classNames={{
                clearIndicator: () => "",
                container: () =>
                  "text-black md:w-2/3 md:w-full lg:w-full text-center   ",
                indicatorsContainer: () => " ",
                control: () => "bg-white flex p-1 rounded-lg gap-4 pl-2   ",
                menu: () => " ",
                menuList: () => "bg-white rounded-md text-md ",
                dropdownIndicator: () => "rounded-lg ",
                valueContainer: () =>
                  "rounded-lg text-black text-lg font-semibold flex gap-2   ",
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
        </div>
      </div>
      <div className=" flex flex-col lg:grid grid-cols-2 items-center gap-4 px-2 md:px-8">
        {asssignTeacherDialog}
        {filterUser.map((f: any, i: number) => {
          const foundAss = foundAssigned.find((c: any) => c.user == f._id);
          // console.log(f, "what the");
          if (!f.roles) return;
          return (
            <div
              key={i}
              className={` bg-gray-600  w-full p-4 rounded-xl text-white font-bold `}
            >
              {/* <Link
                  className=" w-1/2 text-lg outline outline-1 hover:outline-4 transition-all duration-150 rounded-full"
                  href={`/dashboard/viewusers/${f._id}`}
                >
                  View User
                </Link> */}
              <div className="mb-2.5 ">
                <Link
                  href={`/dashboard/viewusers/${f._id}`}
                  className=" hover:text-gray-200"
                >
                  User: {capitalize(f.username)}
                </Link>
              </div>
              <div className=" border-t-2 border-b-2 py-2 pb-3 border-black w-full mx-auto rounded-xl">
                <p>User Roles:</p>
                <ul className="flex justify-center gap-4">
                  {f.roles.map((c: string, i: number) => (
                    <li key={i}>{capitalize(c)}</li>
                  ))}
                </ul>
              </div>
              {/* <p className="my-2.5">Tokens: {f.tokens}</p> */}
              <p className="my-2.5">
                Assigned:{" "}
                {foundAss?.teacher?.user.username ?? " No Teacher assigned"}
              </p>
              <div className="flex gap-4 justify-center mt-4">
                <button
                  className=" w-1/2 text-lg outline outline-1 hover:outline-4 transition-all duration-150 rounded-full"
                  onClick={() => {
                    setTurnDialog(true);
                    setIdUser(f);
                  }}
                >
                  Assign Teacher
                </button>
                {/* <Link
                  className=" w-1/2 text-lg outline outline-1 hover:outline-4 transition-all duration-150 rounded-full"
                  href={`/dashboard/viewusers/${f._id}`}
                >
                  View User
                </Link> */}
                <button
                  className="hover:outline-red-400 w-1/2 text-lg outline outline-1 hover:outline-4 transition-all duration-150 rounded-full"
                  onClick={() => handleDisable(f._id)}
                >
                  Disable User
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
