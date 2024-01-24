"use client";
import React, { useEffect, useState } from "react";

export default function SlideShowBetter() {
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
        className={` overflow-hidden transition-all object-contain  w-full  h-full bg-transparent `}
      >
        <ul
          style={{ transform: `translateX(-${tran}vh)` }}
          className={`  flex  duration-300 transform bg-transparent     `}
        >
          {beforeJsx}
          {
            <div className="hidden md:block w-[33dvh] from-slate-400 via-transparent to-transparent bg bg-gradient-to-l  text-transparent bg-clip-text  text-center  py-2 ">
              <li className="w-[33dvh]">
                <button
                  type="button"
                  onClick={() => setNameIndex(displayList.length - 2)}
                >
                  <p className="text-4xl font-mono">
                    {displayList[displayList.length - 2].name}
                  </p>
                </button>
              </li>
            </div>
          }
          {
            <div className={`${nameIndex == 0 && 'bg-slate-400'} w-[33dvh] from-slate-400  via-transparent to-transparent bg-gradient-to-l text-transparent bg-clip-text  text-center  py-2 `}>
              <li className="w-[33dvh]">
                <button
                  type="button"
                  onClick={() => setNameIndex(displayList.length - 1)}
                >
                  <p className="text-4xl font-mono">
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
                className={`  ${index == nameIndex && "bg-white"} ${
                  index == nameIndex - 1 &&
                  "bg-slate-400"
                } ${
                  index == nameIndex + 1 &&
                  "bg-slate-400"
                } ${index == nameIndex + 2 && 'from-slate-400 via-transparent to-transparent bg bg-gradient-to-r'}  ${index == nameIndex - 2 && 'from-slate-400 via-transparent to-transparent bg bg-gradient-to-l'}  drop-shadow-lg text-center text-transparent bg-clip-text py-2 `}
              >
                <li className=" w-[33vh]">
                  <button type="button" onClick={() => setNameIndex(index)}>
                    <p className="text-4xl font-mono">{d.name}</p>
                  </button>
                </li>
              </div>
            );
          })}
          <div className={`w-[33vh] text-center from-slate-400 via-transparent to-transparent bg-gradient-to-r text-transparent bg-clip-text py-2 ${nameIndex == displayList.length - 1 && 'bg-slate-400'} `}>
            <li className="w-[33vh]">
              <button type="button" onClick={() => setNameIndex(0)}>
                <p className="text-4xl font-mono">{displayList[0].name}</p>
              </button>
            </li>
          </div>
          <div className="w-[33vh] text-center from-slate-400 via-transparent to-transparent bg-gradient-to-r text-transparent bg-clip-text py-2 ">
            <li className="w-[33vh]  hidden md:block">
              <button type="button" onClick={() => setNameIndex(1)}>
                <p className="text-4xl font-mono">{displayList[1].name}</p>
              </button>
            </li>
          </div>
        </ul>
        <div className=" h-full w-full flex  justify-center items-center px-20 text-center md:ml-10  ">
          {displayList.map((d, index) => {
            return (
              
                <div
                  key={index}
                  className={`h-2/3 relative  ${
                    nameIndex == index
                      ? "w-2/3 delay-300 duration-500 opacity-100 mx-auto"
                      : "  "
                  } opacity-0 overflow-hidden  justify-center flex items-start text-black font-sans font-bold  text-lg md:text-3xl  transition-all  duration-500 text-center  `}
                >
                  <p className=" absolute top-4  ">{d.text}</p>
                  {/* <div className="w-3 h-3 bg-purple-300 rounded-full absolute -left-4 top-2 bottom-0 animate-pulse" /> */}
                </div>
              
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
