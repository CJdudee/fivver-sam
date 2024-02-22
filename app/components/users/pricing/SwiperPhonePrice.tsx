"use client";
import React, { useState } from "react";
import PricingPack from "../../pricing/PricingPack";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import PhonePricePack from "./PhonePricePack";
import PhonePricingPack from "./PhonePricingPack";



export default function SwiperPhonePrice({ packages, user }: any) {
  const [tran, setTran] = useState(0);

  const tranNumber = 47.8

  console.log(packages, "this is pack man");
  return (
    <>
      {/* <div className="z-50  flex justify-start gap-4 px-4 lg:hidden -top-8 mt-4">
        <button
          onClick={() => {
            if (tran == 0) return null;
            setTran(tran - tranNumber);
          }}
          className="text-black  text-xl  z-[100] bg-white rounded-full"
        >
          <CgArrowLeft className="text-2xl hover:text-gray-600" />
        </button>
        <button
          onClick={() => {
            if (tran == (packages.length - 1)  * tranNumber) return null;
            setTran(tran + tranNumber);
          }}
          className="text-black  text-xl  z-[100] bg-white rounded-full"
        >
          <CgArrowRight className="text-2xl hover:text-gray-600" />
        </button>
      </div> */}
      <div
        className="lg:hidden flex justify-start items-center  gap-8 mt-4 w-full md:w-full h-2/3 transition-all duration-300  "
        style={{
          transform: `translateX(-${tran}dvh)`,
        }}
      >
        <PhonePricingPack
          // packages={gotPackages}
          packages={packages}
          userId={user?.id}
        />
      </div>
    </>
  );
}
