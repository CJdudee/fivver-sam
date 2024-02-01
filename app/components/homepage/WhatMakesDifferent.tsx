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
      <p className="font-bold text-2xl h-1/4 flex items-center justify-center ">{mainText}</p>
      <div className={` ${flex && 'flex flex-col justify-evenly pb-4 text-6xl gap-6' } text-5xl  h-2/4 flex items-center justify-center  `}>{emoji.map((e) => (
        <p key={e}>
        {e}
        </p>
      ))} </div>
      <p className="text-sm  w-4/5 mx-auto text-center h-1/4 flex items-center justify-center  font-semibold ">
        
       {bottomText}
      </p>
    </div>
  );
}
