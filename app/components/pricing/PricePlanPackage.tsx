"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";

export default function PricePlanPackage({
  price,
  hours,
  onBuy,
  packageId,
  priceArray,
  userId,
  dark,
  value,
  linkPrice,
}: {
  price: number;
  hours: number;
  onBuy: any;
  packageId: string;
  priceArray: any[];
  userId: string | null;
  dark?: boolean;
  value?: boolean;
  linkPrice?: boolean;
}) {
  const [size, setSize] = useState(1);

  const router = useRouter();

  return (
    <div
      className={` ${value && "relative"} ${
        dark && "bg-gradient-to-b from-black  to-[#626262] text-white"
      } bg-white w-full md:w-fit h-fit outline-[#C5C5C5] outline-2 md:outline-1 outline rounded-2xl flex flex-col  pt-8 pb-4 z-20 min-h-max`}
    >
      {value && (
        <div className="w-[58%]  h-[6%] absolute top-2 right-2 bg-[#D9643A] flex justify-center items-center rounded-full">
          <p className="text-center text-[.58rem] w-full ">MOST POPULAR</p>
        </div>
      )}
      <div className=" w-full px-5 ">
        <div className="flex justify-between w-full ">
          <div className="w-full text-xl">
            <p className=" font-[800] ">{hours}</p>
            <p className=" font-[800] ">Hours</p>
          </div>
          <p className="w-min text-end font-[800] text-xl ">
            €{priceArray[size - 1].price}
          </p>
        </div>
        <p className=" -mt-[0.275rem] font-bold text-gray-400">
          Private Lessons
        </p>
      </div>
      <div className="w-2/3 outline outline-1 outline-[#D1D1D1] rounded-full h-[10%] mx-4 my-5 flex items-center ">
        <button
          onClick={() => {
            if (size == 1) return;
            if (size < 1) return setSize(1);
            setSize(size - 1);
          }}
          className="w-1/4 text-center text-3xl flex justify-center items-center pb-1"
        >
          -
        </button>
        <p className="w-2/4 text-[#D9643A] text-center font-bold text-xl">
          1 on {size}
        </p>

        <button
          onClick={() => {
            if (size == 3) return;
            if (size > 3) return setSize(3);
            setSize(size + 1);
          }}
          className="w-1/4 text-center text-3xl flex justify-center items-center pb-2"
        >
          +
        </button>
      </div>
      <p className="px-4 text-sm font-semibold w-[92%]"></p>

      <div className="mt-4 px-4">
        <ul className="flex flex-col gap-1.5">
          <div className="flex gap-3 items-center">
            <div
              className={`  ${
                dark && "bg-[#2C2C2C]"
              } w-5 h-5 rounded-full bg-slate-200  flex items-center justify-center text-white`}
            >
              <CgCheck className=" text-5xl text-green-800" />
            </div>
            <p className="font-semibold text-xs">
              Reschedule any classes as long as you do it a full day before
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <div
              className={` ${
                dark && "bg-[#2C2C2C]"
              } w-5 h-5 rounded-full  bg-slate-200 flex items-center justify-center text-white`}
            >
              <CgCheck className=" text-5xl text-green-800" />
            </div>
            <p className="font-semibold text-xs">
              Spend as soon as you purchase
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <div
              className={` ${
                dark && "bg-[#2C2C2C]"
              } w-5 h-5 rounded-full  bg-slate-200 flex items-center justify-center text-white`}
            >
              <CgCheck className=" text-5xl text-green-800" />
            </div>
            <p className="font-semibold text-xs">Good up to a year</p>
          </div>
        </ul>
      </div>

      <div className="h-full  w-full flex justify-center items-center pt-5">
        <button
          // disabled={!userId}
          onClick={() => {
            if (linkPrice)
              return router.push(`${process.env.HOSTNAME}/pricing`);

            if (!userId)
              return router.push(`${process.env.HOSTNAME}/api/auth/signin`);
            onBuy(packageId, size);
          }}
          className={` ${
            dark && "text-gray-800 bg-white"
          } w-3/4 outline-[#C5C5C5] outline outline-1 text-gray-500 text-sm h-2/3 rounded-full font-[1000] bg-white`}
        >
          {userId ? "Choose plan" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
