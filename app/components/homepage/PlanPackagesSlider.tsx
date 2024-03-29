"use client";
import React, { useEffect, useState } from "react";
import SinglePlanPackage from "./SinglePlanPackage";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import PricePlanPackage from "../pricing/PricePlanPackage";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import SwiperButtonNav from "../users/pricing/SwiperButtonNav";
import { useRouter } from "next/navigation";

export default function PlanPackagesSlider({ pricePackages, user }: any) {
  const [stripeUrl, setStripeUrl] = useState<{ url: string,  emailUrl: string } | null>();
  const [pickedPackage, setPickedPackage] = useState({});
  const [tran, setTran] = useState(0);

  const router = useRouter()

  const isOverFour = pricePackages.length > 3;

  console.log(isOverFour);

  const onBuy = async (packageId: string, groupSize: number) => {

    if(!user) return
    // console.log(groupSize) 
    // return 

    const stripe = await fetch(`${process.env.HOSTNAME}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ packageId: packageId, userId: user.id, groupSize }),
    });

    const stripeJson = await stripe.json();

    if (!stripe) return null;

    console.log(stripeJson);

    setPickedPackage({packageId, groupSize})
    setStripeUrl(stripeJson);
  };

  useEffect(() => {
    if(!router || !stripeUrl) return 

    if(stripeUrl?.emailUrl) return router.push(stripeUrl.emailUrl)

    if (!stripeUrl?.url) return;

    localStorage.setItem("package", JSON.stringify(pickedPackage));

    console.log(stripeUrl);

    router.push(stripeUrl.url);
  }, [stripeUrl, router, pickedPackage]);

  

  return (
    <div className="z-50 relative">
      {/* <div className="z-50  flex justify-start gap-4 px-4 lg:hidden absolute -top-8">
        <button
          onClick={() => {
            if (tran == 0) return null;
            setTran(tran - 43.8);
          }}
          className="text-black  text-xl  z-[100]"
        >
          <CgArrowLeft className="text-2xl hover:text-gray-600" />
        </button>
        <button
          onClick={() => {
            if (tran == 43.8 * (pricePackages.length - 1)) return null;
            setTran(tran + 43.8);
          }}
          className="text-black  text-xl  z-[100]"
        >
          <CgArrowRight className="text-2xl hover:text-gray-600" />
        </button>
      </div> */}
      <div
        className="  flex flex-col gap-2 px-2 lg:px-12 h-full md:justify-center  md:overflow-visible  lg:w-fit transition-all duration-500 lg:hidden items-center justify-center relative    "
        style={{
          transform: `translateX(-${tran}dvh)`,
        }}
      >
        {isOverFour && (
            <div className=" absolute z-40 -top-10 ">
              <Link href={'/pricing'} className="text-black hover:text-gray-700 font-extrabold">View All Packages</Link>
            </div>
          )}
        {/* <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="mySwipers relative "
          loop={true}
          navigation={false}
        >
          <SwiperButtonNav /> */}
          {pricePackages.slice(0, 4).map((p: any, i: number) => {
            const priceArray = [p.priceOne, p.priceTwo, p.priceThree];
            // console.log(index);
            // const onBuy = () => {};
            return (
              // <SwiperSlide className="" key={i}>
                <PricePlanPackage
                  key={i}
                  price={p.price}
                  hours={p.tokens}
                  onBuy={onBuy}
                  packageId={p._id}
                  priceArray={priceArray}
                  userId={user}
                  // linkPrice={true}
                />
              // </SwiperSlide>
            );
          })}

          

          
        {/* </Swiper> */}
      </div>
      <div
        className="  lg:flex gap-2 px-2 lg:px-12 h-fit md:justify-center overflow-hidden md:overflow-visible w-full transition-all duration-500 hidden mx-auto   "
        style={{}}
      >
        {pricePackages.slice(0, 4).map((p: any, i: number) => {
          const priceArray = [p.priceOne, p.priceTwo, p.priceThree];
          // console.log(index);
          // const onBuy = () => {};
          return (
            <PricePlanPackage
              key={i}
              price={p.price}
              hours={p.tokens}
              onBuy={onBuy}
              packageId={p._id}
              priceArray={priceArray}
              userId={user}
              // linkPrice={true}
            />
          );
        })}
        {isOverFour && (
          <div className="bg-white outline-[#C5C5C5] outline-1 outline rounded-xl  z-20 min-h-max  w-1/5">
            <Link
              className="font-bold text-orange-500 w-full h-full flex justify-center items-center text-center"
              href={"/pricing"}
            >
              View All Packages
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <div className="w-1/6 h-full outline-[#C5C5C5] outline-1 outline rounded-xl flex flex-col  pt-6 pb-4">
        <div className=" w-full px-5 ">
          <div className="flex justify-between w-full ">
            <p className="w-1/2 font-[800] text-xl">2 Hours</p>
            <p className="w-1/2 text-end font-[800] text-xl">€00</p>
          </div>
          <p className=" -mt-[0.275rem] font-bold text-gray-400">
            Private Lessons
          </p>
        </div>
        <div className="w-2/3 outline outline-1 outline-[#D1D1D1] rounded-full h-[10%] mx-4 my-5 flex items-center ">
          <p className="w-1/4 text-center text-3xl flex justify-center items-center pb-2">
            +
          </p>
          <p className="w-2/4 text-[#D9643A] text-center font-bold text-xl">
            {" "}
            1 on 1
          </p>
          <p className="w-1/4 text-center text-3xl flex justify-center items-center pb-1">
            -
          </p>
        </div>
        <p className="px-4 text-sm font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>

        <div className="mt-4 px-4">
          <ul className="flex flex-col gap-1.5">
            <div className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full p-1 bg-gray-400" />
              <p className="font-semibold text-xs">Lorem ipsum sit.</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full p-1 bg-gray-400" />
              <p className="font-semibold text-xs">Lorem ipsum sit adsfa;.</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full p-1 bg-gray-400" />
              <p className="font-semibold text-xs">Lorem ipsum sit.</p>
            </div>
          </ul>
        </div>

        <div className="h-full  w-full flex justify-center items-center pt-5">
          <button className="w-3/4 outline-[#C5C5C5] outline outline-1 text-gray-400 text-sm h-2/3 rounded-full font-[1000]">
            Choose plan
          </button>
        </div>
      </div> */
}


{/* {isOverFour && (
<SwiperSlide className="  ">
  <div
    className={`   bg-black text-white  outline-[#C5C5C5] outline-1 outline rounded-xl pt-8 pb-8 px-8 z-20 min-h-max font-semibold h-full  `}
  >
    <p className=" w-full flex items-center justify-center ">View More Packages</p>
  </div>
</SwiperSlide>
)} */}
