import React from 'react'

export default function LineBg() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full z-0">
  <div className="relative h-full w-full overflow-hidden">
    <div className="absolute top-1/2 left-1/2 translate-x-[800%] -translate-y-[95%] h-full w-20 rounded-full bg-[#96472240]" /> <div className="absolute top-1/2 right-1/2 -translate-x-[800%] -translate-y-1/4 h-full w-20 rounded-full bg-[#96472240]" /> <div className="absolute bottom-1/2 left-1/2 translate-x-28 -translate-y-[400%] h-20 w-1/2 rounded-full bg-[#96472240]" /> <div className="absolute bottom-1/2 right-1/2 -translate-x-1/2 translate-y-[400%] h-20 w-1/2 rounded-full bg-[#96472240]" /> <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-full rotate-45 rounded-full bg-[#96472240]" /> 
    <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 h-10 w-full rotate-45 rounded-full bg-[#96472240]" />
    <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-[0%] -translate-y-1/2 h-10 w-full rotate-45 rounded-full bg-[#96472240]" />
  </div>
</div>
  )
}
