import Teacher from "@/models/Teacher";
import { capitalize, simpleJson } from "@/utils/helpers";
import React from "react";

export default async function Page() {
  const teachers = await Teacher.find().populate("user");
  console.log(teachers);

  const teacherJson = simpleJson(teachers);
  return (
    <div className={`text-center text-white h-screen px-4 `}>
      <p className={`text-2xl `}>All Teachers:</p>
      <div className="xl:grid grid-cols-2 gap-2">
        {teacherJson.map((t: any, i: number) => {
          return (
            <div
              key={t._id}
              className="w-full text-xl mt-4 outline outline-1 outline-black py-4 px-2 rounded-xl"
            >
              <div className="flex mb-2 text-2xl font-extrabold justify-center gap-2 pb-2">
                <p className="">Name:</p>
                <p className="">{capitalize(t.user.username)}</p>
              </div>
              <div className="md:flex justify-evenly text-2xl font-bold">
                <div>
                  <p>Total orders </p>
                  <p>{t.orders}</p>
                </div>
                <div>
                  <p>Current orders</p>

                  <p>{t.currentOrders}</p>
                </div>
                <div>
                  <p>CanceledOrders</p>
                  <p>{t.canceledOrders}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
