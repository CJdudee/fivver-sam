import Link from "next/link";
import React from "react";

export default function ViewAll({teachersJson, userJson} : any) {
  return (
    <div className="h-full w-full mx-auto rounded-xl grid grid-cols-2 gap-4">
      <Link href="/dashboard/viewteachers" className="rounded-xl bg-gray-200 shadow-md hover:bg-gray-100 text-black font-extrabold transition-all duration-300 p-4">
        <h2 className="text-lg font-bold mb-2">View All Teachers</h2>
        <div className="flex flex-col">
          {teachersJson.map((j: any, index: number) => (
            <div key={j._id} className="h-1/5 rounded-xl border-b border-gray-300 p-2">
              <p className=" truncate">{j.user.username}</p>
            </div>
          ))}
        </div>
      </Link>
      <Link href="/dashboard/viewusers" className="rounded-xl bg-gray-200 shadow-md hover:bg-gray-100 text-black font-extrabold transition-all duration-300 p-4">
        <h2 className="text-lg font-bold mb-2">View All Users</h2>
        <div className="flex flex-col">
          {userJson.map((u: any, index: number) => (
            <div key={u._id} className="h-1/5 rounded-xl border-b border-gray-300 p-2">
              <p className=" truncate">{u.username}</p>
              <div className="flex items-center text-sm mt-2">
                <p className="mr-2">Email:</p>
                {u.email ? <p className=" truncate">{u.email}</p> : <p>N/A</p>}
              </div>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
