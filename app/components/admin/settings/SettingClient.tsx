"use client";

import {
  applyNewTeacherSetting,
  changeDefault,
  removeDefaultTeacher,
} from "@/actions/adminSettings";
import { errorToast, susToast } from "@/app/lib/react-toast";
import React, { useMemo, useRef, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { IoCloseOutline } from "react-icons/io5";
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

export default function SettingClient({ adminSetting, foundTeacher }: any) {
  const [adminState, setAdminState] = useState(adminSetting);

  const [turnDialog, setTurnDialog] = useState(false);

  const [teacherObj, setTeacherObj] = useState<any>(null);

  const dialogRef = useRef<null | HTMLDialogElement>(null);

  console.log(adminSetting);

  const teacherSelect = useMemo(() => {
    return foundTeacher.map((f: any) => {
      return f;
    });
    // return foundTeacher.map((f: any) => {
    //     return { value: f.user.firstName, label: f.user.firstName };
    //   })
  }, [foundTeacher]);

  const handleSelect = (selectedOption: any) => {
    console.log(selectedOption, "selce");
    console.log(selectedOption._id);
    setTeacherObj(selectedOption);
  };

  const loadOptions = async (searchValue: string, callback: any) => {
    // const filterTeachers = 'hey hey'

    // const allTeachers =  await getAllTeacher()
    const allTeachers = await fetch(`${process.env.HOSTNAME}/api/teachers`, {
      method: "GET",
    });

    const allTeachersJson = await allTeachers.json();
    console.log(allTeachersJson);

    const filterTeachers = await allTeachersJson.filter((option: any) =>
      option.user.firstName.toLowerCase().includes(searchValue.toLowerCase())
    );

    console.log(filterTeachers);
    console.log("loaderoptions", searchValue, filterTeachers);

    callback(filterTeachers);
  };

  const newDefaultTeacher = async () => {
    if (!teacherObj) return;

    const newDefault = await applyNewTeacherSetting(teacherObj);

    // console.log(newDefault)

    if (!newDefault) return errorToast();

    if (newDefault.error) return errorToast(newDefault.error);

    setAdminState(newDefault.data);
    setTeacherObj(null);
    susToast(newDefault.msg as string);
  };

  const removeTeach = async () => {
    if (!adminState) return;

    const removeTeacher = await removeDefaultTeacher();

    if (!removeTeacher) return errorToast();

    if (removeTeacher.error) return errorToast(removeTeacher.error);

    setAdminState(removeTeacher.data);

    susToast(removeTeacher.msg as string);
  };

  const changeCurrentDefault = async () => {
    if (!adminState) return;
    const onOff = await changeDefault();

    if (!onOff) return errorToast();

    if (onOff.error) return errorToast(onOff.error);

    setAdminState(onOff.data);
    susToast(onOff.msg as string);
  };

  //   const asssignTeacherDialog = turnDialog && (
  //     <dialog
  //       className=" fixed top-0 left-0 bg-black/60   flex justify-center items-center z-50 w-full h-full"
  //       ref={dialogRef}
  //     >
  //       <div className="bg-gray-100 rounded-xl p-8 shadow-md w-full h-full md:w-1/2 md:h-1/2 relative">
  //         {/* <p className="w-full mt-4  truncate font-bold mb-2">
  //           Asssign Teacher to {idUser?.username}{" "}
  //         </p> */}
  //         {/* <button
  //           className=" absolute top-1 right-2 hover:text-red-400 font-bold"
  //           onClick={() => {
  //             setTurnDialog(false);
  //             setIdUser(null);
  //             setTeacherId(null);
  //           }}
  //         >
  //           X
  //         </button> */}

  //         <div className="flex flex-col md:flex-row justify-center gap-4">
  //           {teacherId && (
  //             <button
  //               className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 font-bold shadow transition-all"
  //               onClick={handleAssignTeacher}
  //             >
  //               Assign Teacher to User
  //             </button>
  //           )}
  //           {idUser && foundAssigned.find((c: any) => c.user === idUser._id) && (
  //             <button
  //               className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-700 font-bold shadow transition-all"
  //               onClick={handleRemoveTeacher}
  //             >
  //               Remove Assigned Teacher
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     </dialog>
  //   );

  const noDefaultTeacherJsx = (
    <div className="w-full h-full">
      <div className="  h-1/3 w-full md:w-1/2 mx-auto mt-8">
        <AsyncSelect
          loadOptions={loadOptions as any}
          className="text-sm "
          // value={asyncSearch} onChange={(e) => setAsyncSearch(e.target.value)}
          // styles={{
          //   valueContainer: (styles) => ({...styles, color: '#000', backgroundColor: '#0000'})
          // }}
          instanceId={8100}
          defaultOptions={teacherSelect}
          getOptionLabel={(option) => {
            return option.user.firstName as string;
          }}
          getOptionValue={(option: any) => option.user.firstName}
          placeholder="Please Type Teacher Username"
          // noOptionsMessage={"hey"}
          // noOptionsMessage={{msg: 'f'}}
          classNames={styleForSelect}
          onChange={handleSelect}
        />
      </div>
    </div>
  );

  return (
    <div className="mt-12 text-center text-white">
      <p className="text-center text-white font-semibold">
        Assign Default Teacher
      </p>
      <p className="text-xs mt-1">
        New Users will automatically have this teacher assign to them
      </p>
      {noDefaultTeacherJsx}
      <div className="text-center mt-12 flex gap-8 justify-center">
        {teacherObj && (
          <button
            className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] px-8 rounded-full py-2 text-white font-bold"
            onClick={() => {
              newDefaultTeacher();
            }}
          >
            Save As Default
          </button>
        )}
        {adminState?.teacher && (
          <button
            className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] px-8 rounded-full py-2 text-white font-bold"
            onClick={removeTeach}
          >
            Remove Teacher
          </button>
        )}
        {adminState.teacher != null &&
          (adminState?.isDefault == true || adminState?.isDefault == false) && (
            <button
              className={`bg-gradient-to-r ${
                !adminState.isDefault
                  ? "from-[#3068e2] to-[#1c2896]"
                  : "from-[#8f1f1f] to-[#e04040]"
              } px-8 rounded-full py-2 text-white font-bold`}
              onClick={changeCurrentDefault}
            >
              {adminState?.isDefault ? "Turn off default" : "Turn on default"}
            </button>
          )}
      </div>

      {adminState?.teacher?.user && (
        <div className="mt-12 text-2xl">
          <p className="font-bold">Current Default Teacher:</p>
          <div className="flex mt-2 justify-center gap-4">
            <p>{adminState?.teacher?.user.firstName}</p>
            <p>{adminState?.teacher?.user.lastName}</p>
          </div>
          <p className="mt-1">{adminState?.teacher?.user.email}</p>
          <div className="flex justify-center items-start gap-1">
            <p className="mt-2">Verified</p>
            <p className="mt-2">
              {adminState?.teacher?.user.emailVerified ? (
                <FcCheckmark className="text-green-500" />
              ) : (
                <IoCloseOutline className="text-red-500" />
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
