import { Kanit, PT_Serif, Roboto_Serif } from "next/font/google";
import Link from "next/link";
import { LuBookOpen } from "react-icons/lu";

const robot = Roboto_Serif({ subsets: ["latin"], weight: "500" });

const kanit = Kanit({ subsets: ["latin"], weight: "700" });

const protest = PT_Serif({ subsets: ["latin"], weight: "700" });

export default function BookText() {
  return (
    <>
      <p
        className={`${protest.className} text-3xl md:text-4xl text-black md:mb-4 font-extrabold text-center w-full`}
      >
        Online school for German language
      </p>
      <div className="w-full  flex justify-evenly flex-col h-fit md:py-0 ">
        <div className={`${robot.className} flex flex-col gap-2`}>
          <div className={`${robot.className}`}>
            <p className="text-xs md:text-lg text-[#C04000]">
              Sprachgeist, m. the spirit of language: those who do not hold on
              to perception that initially mock all theory (regardless of) their
              factual certainty will never come closer to the unfathomable
              spirit of language
            </p>
            <p className=" -mb-3 text-3xl text-[#C04000]">{`"`}</p>
          </div>

          <p className=" text-center w-2/3 ml-auto font-extrabold text-xs md:text-lg">
            Deutsches Wörterbuch von Jacob und Wilhelm Grimm. Lfg. 15(1905)
          </p>
        </div>
        <div className={`${robot.className} flex flex-col gap-2`}>
          <div className={`${robot.className}`}>
            <p className="text-xs md:text-lg text-[#C04000]">
              The language takes on a personal character; one engages with it as
              with another person. This is one way to experience the{" "}
              <q>language spirit</q> as a living one.
            </p>
            <p className=" -mb-3 text-3xl text-[#C04000]">{`"`}</p>
          </div>

          <p className=" text-center w-2/3 ml-auto  font-extrabold text-xs md:text-lg">
            Sprache und sprachgeist; Rudolf Steiner, 1922
          </p>
        </div>
      </div>
      <div className=" pt-4 pl-8 flex">
        <Link
          href={"/trial"}
          className=" px-10 py-1 md:py-2.5 rounded-xl bg-gradient-to-t from-[#C04000] via-[#C04000] to-[#C04000] text-white flex items-center gap-1.5 justify-center active:to-[#e65f1b]"
        >
          Book a Trial
          {/* <IoBookOutline className="text-md" />{" "} */}
          <LuBookOpen className="" />
        </Link>
      </div>
    </>
  );
}
