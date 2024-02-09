import { Roboto_Serif } from "next/font/google";
import { LuBookOpen } from "react-icons/lu";

const robot = Roboto_Serif({ subsets: ['latin'], weight: '500'})

export default function BookText() {
  return (
    <>
      <div className="w-full  flex justify-evenly flex-col h-fit md:py-0 ">
        <div  className={`${robot.className} flex flex-col gap-2`} >
          <div  className={`${robot.className}`}>
            <p className=" -mb-3 text-3xl text-[#A34F81]">{`"`}</p>
            <p className="text-xs md:text-lg text-[#A34F81]">
              SPRACHGEIST, m. the spirit of language: those who do not hold on to perception that initially mock all theory (regardless of) their factual certainty will never come closer to the unfathomable spirit of language
            </p>
          </div>

          <p className=" text-center w-2/3 ml-auto font-extrabold text-xs md:text-lg">
            Deutsches Wörterbuch von Jacob und Wilhelm Grimm. Lfg. 15(1905)

          </p>
        </div>
        <div  className={`${robot.className} flex flex-col gap-2`}>
          <div className={`${robot.className}`}>
            <p className=" -mb-3 text-3xl text-[#A34F81]">{`"`}</p>
            <p className="text-xs md:text-lg text-[#A34F81]">
            The language takes on a personal character; one engages with it as with another person. This is one way to experience the "language spirit" as a living one.
            </p>
          </div>

          <p className=" text-center w-2/3 ml-auto  font-extrabold text-xs md:text-lg">
          Sprache und sprachgeist; Rudolf Steiner, 1922
          </p>
        </div>
      </div>
      <div className=" pt-4 pl-8 flex items-end">
        <button className=" px-10 py-2.5 rounded-full bg-gradient-to-t from-[#252525] via-[#252525] to-[#626262] text-white flex items-center gap-1.5 justify-center">
          Book a Trial
          {/* <IoBookOutline className="text-md" />{" "} */}
          <LuBookOpen className="" />
        </button>
      </div>
    </>
  );
}
