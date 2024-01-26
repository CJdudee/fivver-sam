import Teacher from "@/models/Teacher";
import Link from "next/link";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

export default async function Page() {

  
  const teachers = await Teacher.find().populate("user", "-password").exec();

  const teachersJson = JSON.parse(JSON.stringify(teachers));
  console.log(teachers);
  return (
    <div className="w-full text-center flex flex-col gap-10 py-4 h-full">
      {teachersJson?.map((t: any) => {

        const {username, email} = t.user

        return (
          <div key={t._id} className="bg-slate-300 w-1/2 mx-auto rounded-full h-1/4">
            <p>{t._id}</p>
            <p>{username}</p>
            <p>{email}</p>
            <Link href={`/teach/${t._id}`}>Book with me</Link>
          </div>
        );
      })}
    </div>
  );
}
