import React from "react";
import SwiperWord from "./SwiperWord";
import TextType from "./TextType";
import Link from "next/link";

export default function WhatWeStandFor() {
  return (
    <>
      <div className="  relative w-full mx-auto  ">
        {/* Hero Section with Background Image */}
        {/* <div className="bg-cover bg-gradient-to-r from-[#D9643A] to-[#E35D5B] bg-no-repeat bg-center h-full md:h-52 w-full rounded-b-[3rem] ">
          <div className="container mx-auto px-4 flex items-center justify-center h-full">
            <div className="text-center md:bg-black opacity-70 md:opacity-50 rounded-lg py-8 px-12 relative">
              <h1 className="text-4xl font-bold text-white text-shadow-md">
                About Us & What We Stand For
              </h1>
              <h6 className="text-2xl font-medium text-white text-shadow-md mb-8">
                Empowering learners to embrace the spirit of the German language
              </h6>
            </div>
          </div>
        </div> */}

        {/* Content Sections with Animations and Accents */}
        <ol className="text-lg font-medium text-slate-200  mx-auto px-4 md:px-24 mt-8 container">
          <div className="mb-20 border-b border-slate-100 pb-8">
            <p className="text-2xl font-bold text-orange-400 mb-4 animate-fade-up">
              Who we are
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="">
                We are Sprachgeist, an online school for the German language.
                Established in a small WunderDorf (wonder village) Undenheim, in
                the vicinity of Mainz, heart of Rheinhessische Dialect {"(don’t worry, we don't use it in our classes)"}.
              </p>
              <p className=" ">
                We are a small team but we pride ourselves to be experts in the
                field with a huge emphasis on a personal touch. Our passion
                towards languages is reflected in the name of our school.
              </p>
            </div>
          </div>
          {/* Repeat section structure for other content areas */}

          <div className="mb-20 border-b border-slate-100 pb-8 ">
            <p className="text-xl font-bold text-orange-400 mb-4 animate-fade-up ">
              What does Sprachgeist mean?
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-center ">
              <p className="animate-popIn">
                Translated to English, it is {`"The Spirit Of Language"`}. It means
                that there is more to a language than {`"sum of its parts"`}, or in
                the words of {`famous Grimm brothers:`}
              </p>
              <div className="border p-4 rounded shadow-md ">
                <p className="font-italic">
                  SPRACHGEIST, m. the spirit of language: those who do not hold
                  on to perceptions that initially mock all theory (regardless
                  of) their {`"factual certainty"`} will never come closer to the
                  unfathomable spirit of language.
                </p>
              </div>
            </div>
          </div>

          {/* Add more sections with animations and accents */}
          <div className="text-center">

          <Link href={`/trial`} className=" text-lg  text-orange-400 animate-fade-up hover:text-orange-500 hover:underline font-semibold ">
            Ready to start your German language journey? Book your free
            consultation today!
          </Link>
          </div>
        </ol>
      </div>
    </>
  );
}
