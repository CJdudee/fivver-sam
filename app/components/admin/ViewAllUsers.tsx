"use client";

import {
  assignTeacherToUser,
  disableUser,
  enableUser,
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
  disabledUser,
}: any) {

  const [disableArray, setDisableArray] = useState(disabledUser)
  console.log(disabledUser)

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
      const lowerName = u.firstName.toLowerCase();

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

    if(!result) return errorToast()

    if(result.error) return errorToast(result.error)

    console.log(result);


    setDisableArray((prev: any) => {
      return [...prev, result.data]
    })
    susToast(result.msg as string)

    // if (result.msg) {
    //   setMsg(result.msg);
    // }
  };

  const handleEnable = async(userId: string) => {
    const result = await enableUser(userId)

    if(!result) return errorToast()

    if(result.error) return errorToast(result.error)

    setDisableArray((prev: any) => {

      // return prev._id != result.data._id
      return prev.map((p: any) => p._id != result.data._id)
    })

    susToast(result.msg as string)

  }

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
      className=" fixed top-0 left-0 bg-black/60   flex justify-center items-center z-50 w-full h-full"
      ref={dialogRef}
    >
      <div className="bg-gray-100 rounded-xl p-8 shadow-md w-full h-full md:w-1/2 md:h-1/2 relative">
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
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {teacherId && (
            <button
              className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 font-bold shadow transition-all"
              onClick={handleAssignTeacher}
            >
              Assign Teacher to User
            </button>
          )}
          {idUser && foundAssigned.find((c: any) => c.user === idUser._id) && (
            <button
              className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-700 font-bold shadow transition-all"
              onClick={handleRemoveTeacher}
            >
              Remove Assigned Teacher
            </button>
          )}
        </div>
      </div>
    </dialog>
  );

  return (
    <div>
      <div className="mb-2 sticky top-[8vh] bg-[#242424]  flex flex-col md:flex-row justify-evenly gap-2 pb-2 pt-2 ">
        <div className="text-lg md:text-2xl flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="md:w-1/2">Find By Name</p>
          <input
            className="rounded-full text-sm md:text-lg w-4/5 md:w-1/2 text-black pl-2 font-bold"
            onChange={(e) => {
              setNameFilter(e.target.value);
              console.log(nameFilter);
            }}
            value={nameFilter}
          />
        </div>
        <div className=" text-lg md:text-2xl flex flex-col md:flex-row items-center justify-center gap-4 mt-2">
          <p className="md:w-1/2">Find By Roles</p>
          {/* <input value={filter} className="rounded-full text-lg w-4/5 md:w-1/2 text-black pl-2 font-bold" onChange={(e) => setFilter(e.target.value)} /> */}
          <div className=" w-4/5 flex justify-center ">
            <Select
              classNames={{
                clearIndicator: () => "",
                container: () =>
                  "text-black  w-full lg:w-full text-center   ",
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
              instanceId={8000}
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
      <div className="flex flex-col lg:grid grid-cols-2 items-center gap-4 px-2 md:px-8">
        {asssignTeacherDialog}
        {filterUser.map((f: any, i: number) => {
          const foundAss = foundAssigned.find((c: any) => c.user == f._id);

          const foundDisable = disableArray.find((d: any) => d.userId == f._id)
          // console.log(f, "what the");
          if (!f.roles) return;
          return (
            <div
              key={i}
              className="bg-white p-4 rounded-xl text-black font-bold"
            >
              {/* User info */}
              <div className="mb-2.5 flex items-center ml-2">
                <Link
                  href={`/dashboard/viewusers/${f._id}`}
                  className="text-lg hover:text-gray-200"
                >
                  User: {capitalize(f.firstName)} {capitalize(f.lastName)}
                </Link>
              </div>

              {/* User roles */}
              <div className="mt-2.5 border-b pb-3 border-black rounded-b-xl">
                <p className="font-bold">User Roles:</p>
                <ul className="flex items-center justify-center gap-4">
                  {f.roles.map((c: any, i: number) => (
                    <li key={i}>{capitalize(c)}</li>
                  ))}
                </ul>
              </div>

              {/* Assigned teacher */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-4">
                <div className="flex flex-col w-full items-center justify-center">
                  <p>Assigned:</p>
                  <p>
                    {foundAss?.teacher?.user.firstName ?? "No Teacher assigned"}
                  </p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => {
                      setTurnDialog(true);
                      setIdUser(f);
                    }}
                    className="px-4 py-2 rounded-md text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold shadow transition-all"
                  >
                    Assign Teacher
                  </button>
                  <button
                    onClick={() =>{
                      if(foundDisable) return handleEnable(f._id)

                      handleDisable(f._id)
                    }}
                    className={`${foundDisable ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700 '} px-4 py-2 rounded-md text-lg text-white font-bold shadow transition-all`}
                  >
                    {foundDisable ? "Enable User" : "Disable User"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <Link
  className=" w-1/2 text-lg outline outline-1 hover:outline-4 transition-all duration-150 rounded-full"
  href={`/dashboard/viewusers/${f._id}`}
>
  View User
</Link> */
}

{
  /* <Link
  className=" w-1/2 text-lg outline outline-1 hover:outline-4 transition-all duration-150 rounded-full"
  href={`/dashboard/viewusers/${f._id}`}
>
  View User
</Link> */
}
