import React from "react";
import { LuBookOpen } from "react-icons/lu";

export default function BookText() {
  return (
    <>
      <div className="w-full ">
        <div className=" flex flex-col gap-2">
          <div>
            <p className=" -mb-3 text-3xl text-[#A34F81]">"</p>
            <p className="text-[#A34F81]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              laboriosam provident quaerat repellendus cupiditate asperiores ex
              modi, deserunt maiores eius a nobis minima, rem ad aperiam
              praesentium, nam consectetur nisi.
            </p>
          </div>

          <p className=" text-center w-2/3 ml-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className=" -mb-3 text-3xl text-[#A34F81]">"</p>
            <p className="text-[#A34F81]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              laboriosam provident quaerat repellendus cupiditate asperiores ex
              modi, deserunt maiores eius a nobis minima, rem ad aperiam
              praesentium, nam consectetur nisi.
            </p>
          </div>

          <p className=" text-center w-2/3 ml-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
