import React from "react";

export default function WhatMakesDifferent({
  mainText,
  emoji,
  bottomText,
  flex
}: {
  mainText: string;
  emoji: any[];
  bottomText: string;
  flex?: boolean
}) {
  return (
    <div className="bg-[#F5F5F5] rounded-xl flex flex-col p-4 gap-4 h-full">
      <p className="font-bold text-2xl h-1/4 flex items-center justify-center" >{mainText}</p>
      <div className={` ${flex && 'flex flex-col justify-evenly pb-4 text-6xl gap-6 items-center' } text-5xl items-start h-2/4 flex  justify-center  gap-2  `}>{emoji.map((e, i) => (
        <p key={`${e} ${i}`}>
        {e}
        </p>
      ))} </div>
      <p className="text-sm  w-full mx-auto text-center h-1/4 flex items-center justify-center  font-bold ">
        
       {bottomText}
      </p>
    </div>
  );
}
