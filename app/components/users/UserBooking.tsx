"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { add, format, formatISO, isBefore, parse, parseISO } from "date-fns";
import {
  capitalize,
  getOpeningTimes,
  roundToNearestMinutes,
} from "@/utils/helpers";
import Calendar from "react-calendar";
import UserCalendar from "./UserCalendar";
import SettingGroup from "./booking/SettingGroup";
import Link from "next/link";

export default function UserBooking({
  teacher,
  teacherWeek,
  closedDate,
  user,
  booked,
  foundTokenJson,
}: any) {
  const [groupSize, setGroupSize] = useState<null | number>(null);
  const [showToken, setShowToken] = useState(false);
  const [tokensObj, setTokensObj ] = useState(foundTokenJson)

  useEffect(() => {
    setShowToken(true);
  }, []);

  useEffect(() => {
    if (groupSize == null) return setShowToken(true);

    setShowToken(false);
  }, [groupSize]);
  // console.log(teacher, "yo");

  const teachName = teacher.user.firstName;

  const router = useRouter();

  const tokenGroup = [
    foundTokenJson.firstGroupTokens,
    foundTokenJson.secondGroupTokens,
    foundTokenJson.thirdGroupTokens,
  ];

  // console.log(tokenGroup)

  return (
    <div className="h-full relative pt-2">
      <div
        className={`  absolute flex w-full px-10 md:px-0 -top-40 mx-auto items-stretch justify-center  transition-all duration-500 gap-10 ${
          showToken && " top-16"
        } `}
      >
        <div className=" delay-150 transition-all text-center font-bold bg-white text-black px-4 rounded-xl py-2 text-xl flex items-center flex-col justify-center w-1/3">
          <p>Individual Classes</p>
          {tokensObj.firstGroupTokens ? (
            <p className="text-xl font-extrabold">{tokensObj.firstGroupTokens} left</p>
            // <p className="text-xl font-extrabold">{firstGroup.tokens} left</p>
          ) : (
            <p>0 left</p>
          )}
        </div>
        <div className=" delay-300 transition-all text-center font-bold bg-white text-black px-4 rounded-xl py-2 text-xl w-1/3 flex flex-col items-center justify-center">
          <p>2 person Classes</p>
          {tokensObj.secondGroupTokens ? (
            <p className="text-xl font-extrabold">{tokensObj.secondGroupTokens} left</p>
            // <p className="text-xl font-extrabold">{secondGroup.tokens} left</p>
          ) : (
            <p>0 left</p>
          )}
        </div>
        <div className=" delay-1000 transition-all text-center font-bold bg-white text-black px-4 rounded-xl py-2 text-xl w-1/3 flex flex-col items-center justify-center">
          <p>3 person Classes</p>
          {tokensObj.thirdGroup ? (
            <p className="text-xl font-extrabold">{tokensObj.thirdGroupTokens} left</p>
            // <p className="text-xl font-extrabold">{thirdGroup.tokens} left</p>
          ) : (
            <p>0 left</p>
          )}
        </div>
      </div>
      <div className="flex w-full justify-evenly mb-2">
        {groupSize != null && (
          <p className="text-center text-3xl font-extrabold w-1/2">
            {capitalize(teachName)}
          </p>
        )}
        <button
          className="w-full text-end font-bold underline underline-offset-2 hover:text-gray-400 text-2xl ml-auto mx-4 md:mx-0"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
      {groupSize != null && (
        <div className=" md:px-40 pt-0 ">
          <UserCalendar
            teacher={teacher}
            teacherWeek={teacherWeek}
            closedDate={closedDate}
            user={user}
            booked={booked}
            groupSize={groupSize}
            setGroupSize={setGroupSize}
            setTokensObj={setTokensObj}
            tokensObj={tokensObj}
          />
        </div>
      )}
      {groupSize == null && (
        <div className="pt-40 md:pt-28 ">
          <SettingGroup
            setGroupSize={setGroupSize}
            teacherName={teachName}
            tokenGroup={tokenGroup}
          />
        </div>
      )}
    </div>
  );
}


// const firstGroup = foundTokenJson.filter((t: any) => t.groupSize == 1);
  // const secondGroup = foundTokenJson.filter((t: any) => t.groupSize == 2);
  // const thirdGroup = foundTokenJson.filter((t: any) => t.groupSize == 3);
  // const firstGroup = foundTokenJson.find((t: any) => t.groupSize == 1);

  // console.log(firstGroup, 'this is group')
  // const secondGroup = foundTokenJson.find((t: any) => t.groupSize == 2);
  // const thirdGroup = foundTokenJson.find((t: any) => t.groupSize == 3);

  // const tokenGroup = {
  //   firstGroup,
  //   secondGroup,
  //   thirdGroup,
  // };
