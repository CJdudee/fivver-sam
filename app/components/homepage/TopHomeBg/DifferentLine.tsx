import React from "react";

export default function DifferentLine() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full z-0">
      {/* <div className="grid grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) bg-[#96472240] -rotate-45">
        <div className="relative rounded-full bg-[#964722a4] h-10 w-10 top-1/2 -translate-y-1/2 mr-auto -rotate-45">
          <div className="absolute -rotate-45 -top-1/2 right-1/2 transform-origin top right"></div>
        </div>
        {/* Other circles with similar structure and adjustments */}
      {/* </div> */} 
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-[200%] rotate-45 rounded-full bg-[#96472240]" />
      <div className=" absolute top-1/2 left-1/2 -translate-x-[75%] -translate-y-1/2 h-10 w-[200%] rotate-45 rounded-full bg-[#96472240]" />
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 h-10 w-[200%] rotate-45 rounded-full bg-[#96472240]" />
      <div className=" absolute top-1/2 left-1/2 -translate-x-[0%] -translate-y-1/2 h-10 w-[200%] rotate-45 rounded-full bg-[#96472240]" />
      <div className=" absolute top-1/2 left-1/2 -translate-x-[100%] -translate-y-1/2 h-10 w-[200%] rotate-45 rounded-full bg-[#96472240]" />
    </div>
  );
}
