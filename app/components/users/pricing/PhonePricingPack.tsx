"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PricePlanPackage from "../../pricing/PricePlanPackage";
// import SinglePlanPackage from "../homepage/SinglePlanPackage";
// import PricePlanPackage from "./PricePlanPackage";

import { EffectCards, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtonNav from "./SwiperButtonNav";

export default function PhonePricingPack({ packages, userId }: any) {
  const [stripeUrl, setStripeUrl] = useState<{
    url: string;
    emailUrl: string;
  } | null>();
  const [pickedPackage, setPickedPackage] = useState({});

  const router = useRouter();

  const onBuy = async (packageId: string, groupSize: number) => {
    if (!userId) return;
    // console.log(groupSize)
    // return

    const stripe = await fetch(`${process.env.HOSTNAME}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ packageId: packageId, userId, groupSize }),
    });

    const stripeJson = await stripe.json();

    if (!stripe) return null;

    console.log(stripeJson);

    setPickedPackage({ packageId, groupSize });
    setStripeUrl(stripeJson);
  };

  useEffect(() => {
    if (!router || !stripeUrl) return;

    if (stripeUrl?.emailUrl) return router.push(stripeUrl.emailUrl);

    if (!stripeUrl?.url) return;

    localStorage.setItem("package", JSON.stringify(pickedPackage));

    console.log(stripeUrl);

    router.push(stripeUrl.url);
  }, [stripeUrl, router, pickedPackage]);

  // console.log(packages)

  return (
    <>
    
      {/* <Swiper
        effect={"cards"}
        grabCursor={true}
        
        modules={[EffectCards, Navigation]}
        className="mySwiper"
        
        loop={true}
        navigation={false}
      >
        <SwiperButtonNav /> */}

        {packages &&
          packages.map((p: any, index: number) => {
            const priceArray = [p.priceOne, p.priceTwo, p.priceThree];
            console.log(index);
            return (
              
                // <SwiperSlide key={index}>
                  <PricePlanPackage
                    key={index}
                    price={p.price}
                    hours={p.tokens}
                    onBuy={onBuy}
                    packageId={p._id}
                    priceArray={priceArray}
                    userId={userId}
                  />
                // {/* </SwiperSlide> */}
              
            );
          })}
          
      {/* </Swiper> */}
    </>
  );
}
