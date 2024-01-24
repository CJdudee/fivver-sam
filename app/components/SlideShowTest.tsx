"use client";

import React, { useEffect, useState } from "react";

export default function SlideShowTest() {
  const [ind, setInd] = useState(3);
  const [nameIndex, setNameIndex] = useState(0);
  const [tran, setTran] = useState(99);

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
  const mult = nameIndex * 100;

  //   let timeout: any = setTimeout(handleTimeOut, 3000)

  useEffect(() => {
    setInd(nameIndex + 3);
    setTran((nameIndex + 3) * 33);
  }, [nameIndex]);

  //   useEffect(() => {
  //     timeout = setTimeout(handleTimeOut, 3000)
  //   }, [nameIndex])

  //   console.log(timeout)

  function handleTimeOut() {
    if (nameIndex == displayList.length - 1) return setNameIndex(0);
    setNameIndex(nameIndex + 1);
  }

  //   function onEnter() {
  //     clearInterval(timeout)
  //     console.log("yo")
  //   }

  const w = "w-[22vh]";

  const beforeJsx = (
    <>
      <div className="w-[33vh]">
        <div className="w-[33vh]" />
      </div>
      <div className="w-[33vh]">
        <div className="w-[33vh]" />
      </div>
      <div className="w-[33vh]">
        <div className="w-[33vh]" />
      </div>
    </>
  );

  return (
    <>
      {/* <p>{nameIndex}</p>
      <p>{mult}</p>
      <button onClick={() => setNameIndex(nameIndex + 1)}> Click</button> */}
      <div
        className={` overflow-hidden transition-all object-contain grad w-full rounded-full h-full `}
      >
        <ul
          style={{ transform: `translateX(-${tran}vh)` }}
          className={`  flex  duration-300 transform   `}
        >
          {beforeJsx}
          {
            <div className="w-[33dvh] bg-slate-900  text-center text-white py-2 ">
              <li className="w-[33dvh]">
                <button
                  type="button"
                  onClick={() => setNameIndex(displayList.length - 1)}
                >
                  <p className="text-3xl">
                    {displayList[displayList.length - 1].name}
                  </p>
                </button>
              </li>
            </div>
          }
          {displayList.map((d, index) => {
            return (
              <div
                key={index}
                className={` ${nameIndex == index && "bg-red-600"} bg-black w-[33vh]   drop-shadow-lg text-center text-white py-2 `}
              >
                <li className=" w-[33vh]">
                  <button type="button" onClick={() => setNameIndex(index)}>
                    <p className="text-3xl">{d.name}</p>
                  </button>
                </li>
              </div>
            );
          })}
          <div className="w-[33vh] text-center text-white bg-slate-900 py-2 ">
            <li className="w-[33vh]">
              <button type="button" onClick={() => setNameIndex(0)}>
                <p className="text-3xl">{displayList[0].name}</p>
              </button>
            </li>
          </div>
        </ul>
        <div className="bg-red-600 h-full flex items-start justify-center px-20 text-center ">
          {displayList.map((d, index) => {
            return (
              <>
                <p key={index} className={`h-2/3 relative  ${nameIndex == index ? 'w-2/3 delay-500 duration-200' : 'w-0 h-0' } overflow-hidden  justify-center flex items-start text-white font-bold  text-lg md:text-2xl my-auto transition-all  opacity-100 duration-500  `}>
                  {d.text}
                  {/* <div className="w-3 h-3 bg-purple-300 rounded-full absolute -left-4 top-2 bottom-0 animate-pulse" /> */}
                </p>
              </>
            );
          })}
        </div>
        {/* <div className="bg-slate-700 h-full flex items-start justify-center px-20 text-center ">
          
          <p className="h-2/3 relative  w-2/3 justify-center flex items-start text-white font-mono text-2xl my-auto transition-all delay-300 opacity-100 duration-500  ">{displayList[nameIndex]?.text}
          <div className="w-3 h-3 bg-purple-300 rounded-full absolute -left-4 top-2 bottom-0 animate-pulse" />
          </p>
        </div> */}
      </div>
    </>
  );
}
