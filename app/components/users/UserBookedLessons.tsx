"use client";

import { cancelBooking, userCancelBooking } from "@/actions/teacherBooking";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize, gerFormat } from "@/utils/helpers";
import { Dialog } from "@headlessui/react";
import {
  addDays,
  addHours,
  addMinutes,
  format,
  formatDate,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import { DateTime } from "luxon";
import React, { useState } from "react";

export default function UserBookedLessons({ booked }: any) {
  const [statusFilter, setStatusFilter] = useState();

  const [daysAway, setDaysAway] = useState<number | undefined>(undefined);

  const [bookingArray, setBookingArray] = useState(booked ?? []);

  const [cancelDialog, setCancelDialog] = useState(false);
  // const [statusFilter, setStatusFilter ] = useState(null)

  const onCancelBook = async (bookingId: string) => {
    const cancel = await userCancelBooking(bookingId);

    if (!cancel) return errorToast();

    if (cancel.error) return errorToast(cancel.error);

    susToast(cancel.success as string);

    console.log(cancel);

    const copy = [...bookingArray];

    const filteredCopy = copy.filter((c) => c._id != bookingId);

    setBookingArray(filteredCopy);
    // window.location.reload()
  };

  const filteredBook = bookingArray.filter((b: any) => {
    // if (statusFilter == null) return true;

    if (statusFilter != null) {
      if (b.status == statusFilter) return true;
    }

    if (daysAway != 0 && daysAway != undefined) {
      const time = new Date(b.date);

      const split = b.time.split(":");

      const addedHour = addHours(time, Number(split[0]));

      const addedMin = addMinutes(addedHour, Number(split[1]));

      const timeFrame = addDays(new Date(), daysAway);

      if (timeFrame < addedMin) return false;
      // if(b.date < new Date().toISOString()) return false
    }

    return true;
  });

  const handleChangeTimeFrame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if(number < 0) return setDaysAway(0)
    if (number == 0) return setDaysAway(undefined);

    setDaysAway(number);
  };

  const cantCancelJsx = (
    <Dialog
    static
      className={" relative h-full w-full "}
      open={cancelDialog}
      onClose={() => setCancelDialog(false)}
    >
      <div className={`${cancelDialog ? 'z-50' : '-z-50'} fixed flex justify-center items-center inset-0 bottom-0 right-0 mx-auto text-center bg-black/30  `}>
        <Dialog.Panel className={"bg-white h-1/2 w-1/2 flex justify-between py-8 flex-col text-2xl px-4 rounded-2xl font-bold"}>
          <Dialog.Title>Unable to Cancel</Dialog.Title>
          <Dialog.Description>
            This action can not be done. A full day is needed to be able to
            cancel Booking
          </Dialog.Description>

          <button className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] rounded-full py-1 text-white hover:text-black active:text-black" onClick={() => setCancelDialog(false)}>Close</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  return (
    <>
      <div className=" sticky top-10 md:top-16 py-2 px-2 z-30 drop-shadow-xl shadow-xl  bg-[#242424] rounded-xl  ">
        <div className="flex flex-col gap-2 items-center justify-center">
          <label className="text-2xl font-bold text-white" htmlFor="daysAway">
            Set TimeFrame
          </label>
          <input
            className="text-center bg-[#eeeeee94] rounded-full font-bold"
            id="daysAway"
            value={daysAway}
            onChange={(e) => {
              handleChangeTimeFrame(e)
            }}
            type="number"
          />
        </div>
      </div>
      <div>
        
        

        {cantCancelJsx}
        
        

        <div className=" flex flex-col lg:grid grid-cols-2 gap-8 pt-8 px-2">
          {filteredBook.map((b: any) => {
            let time: any = new Date(b.date);

            console.log(time, "before edit");
            time = DateTime.fromJSDate(time, {
              zone: "Europe/Berlin",
            })
              .setLocale("SJ")
              .startOf("day")
              .toJSDate();
            const timeTester = DateTime.fromJSDate(time)
              .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
              .toFormat("h:mm");
            // console.log(time, "before edit");
            // time = new Date(time).toLocaleString('SJ', { timeZone: 'Europe/Berlin' })
            console.log(time, "after edit");

            // startDate =  DateTime.fromJSDate(startDate, { zone: "Europe/Berlin" } ).setLocale("SJ").startOf('day').toJSDate()

            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // console.log(gerOffset, engOffset, "offset");

            // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const timeArray = b.time.split(":");

            // const fullDay = addDays(new Date(), 1) < time
            // const fullDay = addDays(time, 1)

            const addedHour = addHours(time, Number(timeArray[0]));

            const addedMin = addMinutes(addedHour, Number(timeArray[1]));

            const isFullDay = addDays(new Date(), 1) < addedMin;

            const distance = formatDistanceToNow(addedMin);
            const distanceStric = formatDistanceToNowStrict(time);
            // const fullDay = addDays(new Date(), 1)

            // const addedHour = addHours(fullDay, Number(timeArray[0]))
            const displayTime = DateTime.fromJSDate(addedMin)
              .toFormat(" HH:mm ")
              .toLocaleLowerCase();
            const formated = gerFormat(addedMin);

            console.log(addedMin, formated, displayTime);

            let numberStart = Number(timeArray[0]);

            let pm = false;

            if (numberStart == 12) {
              pm = true;
            }
            if (numberStart > 12) {
              console.log(numberStart, "yo what the");
              const compare = numberStart;
              console.log(compare);

              numberStart = numberStart % 12;
              pm = true;

              if (compare == 24) {
                numberStart = 12;
                pm = false;
              }
            }

            const result = `${numberStart}:${timeArray[1]}`;

            // const addedMin = addMinutes(addedHour, Number(timeArray[1]))

            // console.log(timeArray, isFullDay, addedMin, addDays(new Date(), 1));
            // console.log(formatted, formattedDay, "yo yo what");

            return (
              <div
                key={b._id}
                className="justify-center flex flex-col items-center text-white font-bold text-2xl bg-[#3b3b3bd2]  drop-shadow-xl shadow-xl rounded-3xl  my-4 p-4 w-full md:w-11/12 lg:w-full mx-auto  "
              >
                <div className="flex flex-col md:flex-row w-full justify-center items-center gap-2 md:gap-8 text-3xl mb-4">
                  <p className=" text-center  rounded-tl-xl font-extrabold">
                    Booked With :
                  </p>
                  <div className="flex justify-center gap-4">
                    <p className=" text-center  rounded-tr-xl truncate font-extrabold">
                      {capitalize(b.teacher.user.firstName)}
                    </p>
                    <p className=" text-center  rounded-tr-xl truncate font-extrabold">
                      {capitalize(b.teacher.user.lastName)}
                    </p>
                  </div>
                </div>
                {/* <p>{b.date}</p> */}
                <div className="flex flex-col gap-2 items-center justify-evenly w-full mb-4">
                  <div className="w-full flex justify-evenly">
                    {/* <p>Date</p> */}

                    {/* <p className="w-fit text-center">{distance} from now</p> */}
                    {/* <p>{distanceStric}</p> */}
                    <p className=" text-center">Booked for {formated}</p>
                  </div>
                  <p className="w-full md:w-1/3 text-center">
                    At Time {displayTime}
                    {/* At Time {result} {pm ? "pm" : "am"} */}
                  </p>
                </div>
                <div className="text-center w-full">
                  <div className="flex flex-col items-center justify-evenly w-full  mx-auto  rounded-3xl border-t-2 border-b-2 py-2">
                    <p className="pb-1 text-orange-500 pt-2 font-bold">Teacher Info</p>
                    <figure className="p-[1em] rounded-[1em] bg-[#eee] m-0 w-full text-black md:w-[95%] my-4">
                      <div className="flex flex-col md:flex-row w-full mb-2 justify-center gap-2 ">
                        <p className=" text-center  ">Email:</p>
                        <p className=" text-center  ">
                          {b.teacher.user.email != ""
                            ? b.teacher.user.email
                            : "No Email "}
                        </p>
                      </div>
                    </figure>
                    {b.groupSize && (
                      <p className="text-center w-full">
                        Group Size: {b.groupSize}
                      </p>
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="flex w-full justify-evenly mt-4">
                  {/* <button>Accept</button> */}
                </div>
                <div className="w-full flex jsutify-between">
                  {b.status && (
                    <p className="text-start w-full">
                      {b.status == "pending" && "Awaiting"}
                    </p>
                  )}
                  {/* {b.status == "pending" && (
                    <button
                      className={`${isFullDay ? '' : 'text-gray-400'} outline outline-1 hover:outline-4 hover:outline-red-800 transition-all duration-300 px-8 rounded-full py-1 hidden md:block `}
                      onClick={() => {
                        if (!isFullDay) {
                          setCancelDialog(true);
                          return;
                        }

                        onCancelBook(b._id);
                      }}
                      // disabled={!isFullDay}
                    >
                      Cancel
                    </button>
                  )} */}
                  <p className="text-end w-full ">{distance} away</p>
                </div>
                {b.status == "pending" && (
                    <button
                      className={`${isFullDay ? '' : 'text-gray-400'} outline outline-1 hover:outline-4 hover:outline-red-800 transition-all duration-300 px-8 rounded-full py-1 hidden md:block bg-gradient-to-r from-[#D9643A] to-[#E35D5B]`}
                      onClick={() => {
                        if (!isFullDay) {
                          setCancelDialog(true);
                          return;
                        }

                        onCancelBook(b._id);
                      }}
                      // disabled={!isFullDay}
                    >
                      Cancel
                    </button>
                  )}
               
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}


{/* {b.status == "pending" && (
  <button
    className="outline outline-1 bg-gradient-to-r from-[#D9643A] to-[#E35D5B] hover:outline-4 hover:outline-red-800 transition-all duration-300 px-8 rounded-full py-1 mt-2 hover:text-black "
    onClick={() => {
      onCancelBook(b._id);
    }}
    disabled={!isFullDay}
  >
    Cancel
  </button>
)} */}