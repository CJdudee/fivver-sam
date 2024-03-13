import { CgPhone } from "react-icons/cg";
import { FaPhone } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import TimeZoneComp from "../../TimeZoneComp";
import EmailForm from "./EmailForm";

export default function ContactComp() {
  return (
    <div className=" flex flex-col h-full min-h-[800px] justify-evenly items-center text-white font-semibold pb-20 relative">
      <div className="text-4xl flex items-center flex-col pt-4">
        <p className="">Want to Contact Us?</p>
        {/* <p className="text-lg mt-2">{`Here's`} how you can reach us!</p> */}
        {/* <div className="mt-4 animate-fadeIn text-center ">
          <TimeZoneComp />
        </div> */}
      </div>

      <div className="flex flex-col items-center gap-8 my-20 mb-14">
        {/* <p className="text-3xl font-bold w-1/2 text-center">Our contact infomation:</p> */}
        <div className="flex flex-col gap-8 lg:grid grid-cols-2 ">
          <div className="flex gap-2 border-b-2 rounded-xl px-4 pb-2 justify-center text-center">
            <IoLocation className="w-7 h-7 text-orange-400 " />
            <p>Staatsrat-Schwamb-Straße 18, 55278 Undenheim</p>
          </div>
          <div className="flex gap-2 border-b-2 rounded-xl px-4 pb-2 justify-center text-center">
            <MdEmail className="w-7 h-7 text-orange-400 " />
            <p>info@sprachgeist.com</p>
          </div>
          <div className="flex gap-2 border-b-2 rounded-xl px-4 pb-2 justify-center text-center">
            <HiClock className="w-7 h-7 text-orange-400 " />
            <p>8am-10pm CET, 7 days a week</p>
          </div>
          <div className="flex justify-center items-center gap-2 border-b-2 rounded-xl px-4 pb-2 ">
            <CgPhone className="w-7 h-7 text-orange-400" />
            <p>Number: +49 1573 4789628</p>
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-0 md:w-2/3 lg:w-2/3 mt-0 md:mt-8 my-8">
        <p className="text-center text-2xl mb-3 text-orange-400">Contact Form</p>
        <EmailForm />
      </div>

      <div className="flex gap-1">
        <p className="font-bold italic">Launched:</p>
        <p>January 2024</p>
      </div>
    </div>
  );
}

{
  /* <div className="flex gap-2 border-b-2 rounded-xl px-2 pb-1">
          <CgPhone className="w-7 h-7" />
          <p>Number: 000-000-0000</p>
        </div> */
}
