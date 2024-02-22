"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function HeadlessDrop({ linkArray }: any) {
  return (
    <Menu as={"div"} className=" w-1/2 flex justify-start  relative">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center  text-sm font-medium text-white ">
          <RxHamburgerMenu
            // className="h-8 w-8 text-white"
            className=" h-7 w-7 text-violet-200 hover:text-violet-100"
            // aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-6 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-[#c05000] shadow-lg ring-1 ring-black/5 focus:outline-none text-center font-bold text-white">
          <div className="px-1 py-1 flex flex-col">
            {linkArray.map((l: any, i: number) => {
              return (
                <Menu.Item key={i} >
                  <Link className="py-1" href={l.link}>{l.text}</Link>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
