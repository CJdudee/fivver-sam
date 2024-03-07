"use client";
import { addGoogleLink, removeGoogleLink } from "@/actions/monthlyOrder";
import { errorToast, susToast } from "@/app/lib/react-toast";
import Link from "next/link";
import React, { useState } from "react";

export default function ClassRoomLink({ teacherLink, teacherId }: any) {
  const [classRoomLink, setClassRoomLink] = useState<string>(teacherLink);

  const [newClassRoomLink, setNewClassRoomLink] = useState<string>("");

  const [addNewLink, setAddNewLink] = useState<boolean>(false);

  const handleAssignLink = async () => {
    if (!newClassRoomLink || newClassRoomLink == "") return;

    if (classRoomLink == newClassRoomLink)
      return errorToast("Link has not been changed");

    const assigningLink = await addGoogleLink(teacherId, newClassRoomLink);

    if (!assigningLink) return errorToast();

    // setTeacherArray((prev: any) => {
    //   return prev.map((p: any) => {
    //     if (p._id == teacherId) {
    //       return assigningLink.data;
    //     } else {
    //       return p;
    //     }
    //   });
    // });

    setClassRoomLink(newClassRoomLink);

    setNewClassRoomLink("");

    susToast(assigningLink.msg as string);

    setAddNewLink(false);

    // setIsAddingLink(null);
    // setGoogleLinkString(null);
    // window.location.reload();
  };

  const handleRemoveGoogleLink = async () => {
    if (!teacherId) return;

    const removedLink = await removeGoogleLink(teacherId);

    if (!removedLink) return;

    // setTeacherArray((prev: any) => {
    //   return prev.map((p: any) => {
    //     if (p._id == teacherId) {
    //       return removedLink.data;
    //     } else {
    //       return p;
    //     }
    //   });
    // });

    setClassRoomLink("");

    setNewClassRoomLink("");

    susToast(removedLink.msg as string);

    // window.location.reload();
  };

  return (
    <div>
      {classRoomLink != (undefined || "") && (
        <p className="text-center font-bold text-white w-full">
          Class Room Link:{" "}
          <a className="hover:text-gray-300" href={`${classRoomLink}`}>
            {classRoomLink}
          </a>
        </p>
      )}
      {classRoomLink == (undefined || "") && (
        <p className="text-white font-semibold text-2xl">
          Class Room Link has not been set up
        </p>
      )}
      {!addNewLink ? (
        <div className="text-center  mt-4 flex justify-center gap-8 ">
          <button
            onClick={() => {
              setAddNewLink(true);
              setNewClassRoomLink("");
            }}
            className="text-white hover:text-black px-8 rounded-full bg-gradient-to-br from-[#D9643A] to-[#E35D5B] font-bold py-2"
          >
            Add Class link
          </button>

          {classRoomLink != (undefined || "") && (
            <button
              onClick={() => {
                handleRemoveGoogleLink();
              }}
              className="text-white hover:text-black px-8 rounded-full bg-gradient-to-br from-[#ec0e0e] to-[#be7473] font-bold py-2"
            >
              Remove Link
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center mt-4 w-full">
          <input
            value={newClassRoomLink}
            onChange={(e) => setNewClassRoomLink(e.target.value)}
            className="text-xl rounded-full px-2 w-full"
          />
          <div className="w-full flex justify-evenly mt-4">
            <button
              onClick={() => {
                handleAssignLink();
                // setNewClassRoomLink('')
              }}
              className="text-white hover:text-black px-8 rounded-full bg-gradient-to-br from-[#D9643A] to-[#E35D5B] font-bold py-2"
            >
              Save
            </button>
            <button
              onClick={() => {
                setNewClassRoomLink("");
                setAddNewLink(false);
                // handleRemoveGoogleLink();
                // setNewClassRoomLink('')
              }}
              className="text-white hover:text-black px-8 rounded-full bg-gradient-to-br from-[#862e0b] to-[#e21916] font-bold py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
