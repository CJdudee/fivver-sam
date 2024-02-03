'use client'
import React, { useState } from "react";
// import "react-slideshow-image/dist/styles.css";

import { Slide } from "react-slideshow-image";

export default function SlideShow() {
  const [nameIndex, setNameIndex] = useState(0)

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
    <>
      {/* <ul className="">
        <Slide indicators arrows={false} slidesToShow={2}   >
          {displayList.map((l: any, index) => (
            <div key={index} className="w-[33dvh] bg-slate-800 text-center h-[20dvh] flex rounded-full mx-auto">
              <button className="flex flex-col justify-center items-center  mx-auto">
                <p className="text-purple-400">{l.name}</p>
                <p className="text-purple-400">{l.text}</p>
              </button>
            </div>
          ))}
        </Slide>
      </ul> */}
      <ul className="flex flex-row w-full overflow-scroll gap-8 whitespace-nowrap h-[40dvh] text-white items-center justify-between ">
        {displayList.map((l: any, index) => (
          <div key={index} className="w-full">

          <li className="w-[50dvh] h-[20dvh] bg-purple-900  rounded-full flex justify-center items-center flex-col   text-center">
            <p className="w-full">{l.name}</p>
            <p className=" w-full  bg-slate-400  whitespace-normal ">{l.text}</p>
          </li>
          </div>
        ))}
      </ul>
      <ul className="text-center flex gap-x-20 justify-center bg-slate-800 overflow-hidden text-white relative w-2/3 mx-auto">
        <li className=" absolute -left-10">{displayList[nameIndex].name}</li>
        <li onClick={() => setNameIndex(nameIndex - 1)}>{displayList[nameIndex - 1]?.name ?? displayList[displayList.length - 1]?.name}</li>
        <li>{displayList[nameIndex].name}</li>
        <li onClick={() => setNameIndex( nameIndex + 1)}>{displayList[nameIndex + 1 ?? 0].name}</li>
      </ul>
    </>
  );
}
