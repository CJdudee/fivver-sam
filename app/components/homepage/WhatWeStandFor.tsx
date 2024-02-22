import React from "react";
import SwiperWord from "./SwiperWord";
import TextType from "./TextType";

export default function WhatWeStandFor() {
  return (
    <>
      <div className="text-center pt-4 rounded-3xl border-orange-300 mx-8   border-t-8">
        <h1 className="text-center text-4xl bg-gradient-to-r bg-clip-text from-[rgb(192,64,0)] via-orange-300 to-[#FFAA33] font-extrabold  text-transparent">
          About Us And What We Stand For
        </h1>
        <h6 className="text-centen text-orange-300 text-sm pt-1 ">
          Empowering learners to embrace the spirit of the German language
        </h6>
      </div>
      <ol className=" mt-8 flex flex-col justify-evenly gap-20 text-slate-200 text-lg text-center px-2 md:px-24 h-full pb-20 font-bold">
        <div className="text-center">
          <p className="text-3xl pl-8 mb-2 font-extrabold text-orange-400">Our Beginnings</p>
          <div className="flex justify-center gap-8">
            <p className="   ">
              We are Sprachgeist, an online school for the German language.
              Established in a small WunderDorf (wonder village) Undenheim, in
              the vicinity of Mainz, heart of Rheinhessische Dialect (don’t
              worry, we don't use it in our classes).
            </p>
            <p>
              We are a small team but we pride ourselves to be experts in the
              field with a huge emphasis on a personal touch. Our passion
              towards languages is reflected in the name of our school.
            </p>
          </div>
        </div>
        <div className="flex">
          <p>
            So what does the Sprachgeist mean? Translated to English, it is “The
            Spirit Of Language”. It means that there is more to a language than
            “sum of its parts”, or in the words of famous Grimm brothers:
          </p>
          <p>
            SPRACHGEIST, m. the spirit of language: those who do not hold on to
            perceptions that initially mock all theory (regardless of) their
            “factual certainty” will never come closer to the unfathomable
            spirit of language.
          </p>
        </div>
        <p>
          Humorous image might give a better idea of one of the dimensions Grimm
          brothers were talking about (particularly the “mock all theory” part):
        </p>

        {/* <SwiperWord /> */}
        <TextType />
        {/* picture of the different words in german that means you  */}
        <p>
          you can see above that the English language is quite capable of
          conveying the same message as the German language can, but it is not
          relying on “mere” words to do so. We hope we succeeded in showing at
          least a little bit of passion we have for teaching you the German
          language and if so, then let us be your Sprachgeist!
        </p>
        {/* <p>Your SprachGeist team</p> */}
        <p>
          Ready to start your German language journey? Book your free
          consultation today!
        </p>
      </ol>
    </>
  );
}
