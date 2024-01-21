"use client";
import React from "react";

export default function HomePageComp() {
  const displayList = [
    {
      name: "Teacher",
      text: "Native German speaker",
    },
    {
      name: "Dedicated",
      text: "Your own personal teacher, following you each step of the way",
    },
    {
      name: "Expertize",
      text: "Your teacher has a university degree in German language",
    },
    {
      name: "Personal",
      text: "We are a small team of experts, but we are big on personal touch",
    },
    {
      name: "Flexible",
      text: "From our reschedule/cancel policy to anything you need, your teacher is there for you",
    },
  ];

  return (
    <div className=" justify-around flex flex-col min-h-[92dvh] bg-slate-400 ">
      <h3 className="mt-8 text-6xl font-mono font-bold text-center cursor-default">
        Spend some time with us to <span className="block">learn:</span>
      </h3>

      <div className="bg-blue-400 w-full rounded-full h-full">
        <div className=" w-full">
          <ul className="text-center py-8 font-sans text-3xl flex justify-center gap-10 overflow-x-scroll w-full ">
            {displayList.map((d) => {
              return (
                <li className="w-full bg-slate-400">
                <div className="w-full">

                  <p>{d.name}</p>
                </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
