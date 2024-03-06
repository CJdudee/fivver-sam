"use client";

import { updateUser } from "@/actions/userProfile";
import OldBookingMap from "@/app/components/teachers/old/OldBookingMap";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize } from "@/utils/helpers";
import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";

export default function ViewUserClient({ bookingArray, studentInfo }: any) {
  const [userData, setUserData] = useState({
    firstName: studentInfo.firstName,
    lastName: studentInfo.lastName,
    email: studentInfo.email,
  });

  const [editUserData, setEditUserData] = useState({
    firstName: studentInfo.firstName,
    lastName: studentInfo.lastName,
    email: studentInfo.email,
    password: "",
  });
  const [editInfo, setEditInfo] = useState(false);

  const [tab, setTab] = useState("");

  const handleUpdate = async () => {
    if (
      !editUserData.firstName ||
      !editUserData.lastName ||
      !editUserData.email
    )
      return;

    const userData = {
      ...editUserData,
      _id: studentInfo.user._id,
    };

    const updated = await updateUser(userData);

    if (!updated) return errorToast();

    if (updated.error) return errorToast(updated.error);

    susToast(updated.msg as string);

    setUserData({ ...editUserData });
    setEditInfo(false);
  };


  const bookingAppointmentJsx = (
    <div>
      {bookingArray.length == 0 && (
        <div className="h-full flex items-center justify-center pb-12 text-3xl font-extrabold text-white drop-shadow-xl shadow-2xl">
          <p>No Past Bookings</p>
        </div>
      )}

      <figure className="flex justify-center items-center flex-col gap-8 mt-2 px-4  md:grid grid-cols-2">
        {bookingArray.map((b: any, i: number) => {
          return <OldBookingMap key={i} userData={b.teacher.user} data={b} />;
        })}
      </figure>
    </div>
  );

  const userInfoJsx = (
    <div className="flex flex-col items-center justify-center mt-4 w-full md:w-3/4 mx-auto outline py-8 outline-1 rounded-xl">
      {!editInfo && (
        <>
          <div className="w-full flex flex-col md:flex-row items-center justify-evenly text-white text-3xl">
            <p>First name: {userData.firstName}</p>
            <p>Surname: {userData.lastName}</p>
          </div>
          <div className="md:w-1/2 mx-auto flex flex-col md:flex-row justify-between mt-8 text-white text-3xl  px-8 rounded-xl py-2 items-center">
            <p>Email: </p>
            <p>{userData.email}</p>
          </div>
          <div className="mt-8 text-white text-2xl  p-4 rounded-xl">
            <p className="text-center">Roles</p>
            <div className="flex justify-center">
              {studentInfo.roles.map((r: string, i: number) => {
                return <p key={i}>{capitalize(r)}</p>;
              })}
            </div>
          </div>
          <div className="mb-6 mt-2 text-2xl text-white">
            {!studentInfo.customerId && <p>No Stripe Customer ID</p>}
            {studentInfo.customerId && <p>Customer ID</p>}
            <p className="mt-2">{studentInfo.customerId}</p>
          </div>
        </>
      )}
      {editInfo && (
        <>
          <div className="w-full flex flex-col md:flex-row  items-center justify-evenly text-white text-3xl">
            <div className=" text-center">
              <p>First name:</p>
              <input
                className="w-4/5 mt-1 rounded-full px-2 mb-1 text-xl text-black"
                onChange={(e) =>
                  setEditUserData((prev: any) => {
                    return { ...prev, firstName: e.target.value };
                  })
                }
                value={editUserData.firstName}
              />
            </div>
            <div className=" text-center">
              <p>Surname:</p>
              <input
                className="w-4/5 mt-1 rounded-full px-2 mb-1 text-xl text-black"
                onChange={(e) =>
                  setEditUserData((prev: any) => {
                    return { ...prev, lastName: e.target.value };
                  })
                }
                value={editUserData.lastName}
              />
            </div>
          </div>
          <div className="md:w-1/2 mx-auto flex flex-col  justify-between mt-8 text-white text-3xl  px-8 rounded-xl py-2 items-center mb-4">
            <p>Email: </p>
            <input
              className="w-full mt-1 rounded-full px-2 mb-1 text-2xl text-black"
              onChange={(e) =>
                setEditUserData((prev: any) => {
                  return { ...prev, email: e.target.value };
                })
              }
              value={editUserData.email}
            />
          </div>
          <div className="md:w-1/2 mx-auto flex flex-col  justify-between mt-8 text-white text-3xl  px-8 rounded-xl py-2 items-center mb-4">
            <p>Password: </p>
            <p className="text-xs my-1">
              Leave blank to keep the same password
            </p>
            <input
              className="w-full mt-1 rounded-full px-2 mb-1 text-2xl text-black"
              onChange={(e) =>
                setEditUserData((prev: any) => {
                  return { ...prev, password: e.target.value };
                })
              }
              value={editUserData.password}
            />
          </div>
          {/* <div className="mt-8 text-white text-2xl  p-4 rounded-xl">
            <p className="text-center">Roles</p>
            <div className="flex justify-center">
              {teacherInfo.user.roles.map((r: string, i: number) => {
                return <p key={i}>{capitalize(r)}</p>;
              })}
            </div>
          </div> */}
        </>
      )}

      <div className="w-full flex justify-evenly">
        {editInfo && (
          <button
            onClick={() => handleUpdate()}
            className="bg-gradient-to-l from-[#15bef1] to-[#1745dd] px-4 text-white hover:text-black active:text-black py-2 rounded-full font-bold"
          >
            Save
          </button>
        )}
        <button
          onClick={() => {
            if (editInfo == false) {
              setEditUserData({
                firstName: studentInfo.firstName,
                lastName: studentInfo.lastName,
                email: studentInfo.email,
                password: "",
              });
            }

            setEditInfo(!editInfo);
          }}
          className={`bg-gradient-to-r ${
            editInfo
              ? "from-[#f11515] to-[#740c0a]"
              : "from-[#D9643A] to-[#E35D5B]"
          } px-4 text-white hover:text-black active:text-black py-2 rounded-full font-bold`}
        >
          {!editInfo ? "Edit" : "Cancel"}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <nav className="flex w-full  justify-evenly items-center  md:px-4 mt-2 ">
          <button
            type="button"
            className={`
                flex items-center justify-center w-full px-4 py-2 rounded-md
                font-medium  md:hover:bg-gray-200 active:bg-gray-200 hover:text-orange-600
                ${tab === "" ? "text-orange-600" : "text-white"}
              `}
            onClick={() => setTab("")}
          >
            <span>Info</span>
            {tab === "" && <CgCheck className="h-5 w-5 text-orange-600 ml-2" />}
          </button>
          <button
            type="button"
            className={`
                flex items-center justify-center w-full px-4 py-2 rounded-md
                font-medium  md:hover:bg-gray-200 active:bg-gray-200 hover:text-orange-600
                ${tab === "booking" ? "text-orange-600" : "text-white"}
              `}
            onClick={() => setTab("booking")}
          >
            <span>Bookings</span>
            {tab === "booking" && (
              <CgCheck className="h-5 w-5 text-orange-600 ml-2" />
            )}
          </button>
        </nav>
      </div>
      {tab == "booking" && bookingAppointmentJsx}
      {tab == "" && userInfoJsx}
    </div>
  );
}
