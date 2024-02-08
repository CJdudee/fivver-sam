import Link from "next/link";
import React from "react";

export default function ViewAll({teachersJson, userJson} : any) {
  return (
    <div className="h-full w-full  mx-auto rounded-xl  flex gap-2">
      <Link
        href={"/dashboard/viewteachers"}
        className=" pri w-1/2 md:w-full h-full rounded-xl text-black font-extrabold hover:w-[120%] hover:h-[105%] hover:z-20 transition-all duration-300 hover:outline-2 outline-white hover:outline"
      >
        <p className="h-1/5 bg-slate-200 rounded-xl flex items-center justify-center font-extrabold text-xl">View All Teacher</p>
        <div className="flex flex-col h-full border-t-2 pt-4 border-black">
          {teachersJson.map((j: any, index: number) => {
            return (
              <div
                key={j._id}
                className={` ${
                  index % 2 == 0 ? "bg-slate-300" : "bg-slate-200"
                } h-1/5 rounded-xl `}
              >
                <p>{j.user.username}</p>
              </div>
            );
          })}
        </div>
      </Link>
      <Link
        href={"/dashboard/viewusers"}
        className=" pri w-1/2 md:w-full h-full rounded-xl text-black font-extrabold hover:w-[120%] hover:h-[105%] hover:z-20 transition-all duration-300 hover:outline-2 outline-white hover:outline"
      >
        <p className="h-1/5 bg-slate-200 rounded-xl flex items-center justify-center font-extrabold text-xl">View All User</p>

        <div className="flex flex-col h-full border-t-2 pt-4 border-black">
          {userJson.map((u: any, index: number) => {
            return (
              <div
                key={u._id}
                className={` ${
                  index % 2 == 0 ? "bg-slate-300" : "bg-slate-200"
                } h-1/5 rounded-xl `}
              >
                <p>{u.username}</p>
                <div className="flex gap-4 w-2/3 mx-auto">
                  <p className="text-sm w-1/3 text-center">Email:</p>
                  {!u.email && (
                    <p className="text-sm w-2/3 text-center truncate">No Email</p>
                  )}
                  {u.email && (
                    <p className="text-sm w-2/3 text-center truncate">
                      {u.email}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  );
}
