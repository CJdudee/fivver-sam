import React from 'react'

export default function BackgroundTest() {
  return (
    <>
    <div className=" absolute  bottom-0 h-4/5  w-1/2 left-0 -right-[20%] -top-[55%]  border-[40px] ml-auto rounded-full  border-opacity-80  z-0 flex justify-center items-center ">
          <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto flex justify-center items-center">
            <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto"></div>
          </div>
        </div>
        <div className=" absolute  bottom-0 h-4/5  w-1/2 right-0 -left-[20%] top-[55%]  border-[40px] mr-auto rounded-full  border-opacity-80  z-0 flex justify-center items-center ">
          <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto flex justify-center items-center">
            <div className=" border-[40px] h-[92%] w-[92%] rounded-full mx-auto"></div>
          </div>
        </div>
    </>
  )
}
