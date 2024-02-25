import { capitalize } from "@/utils/helpers";
import React, { useState } from "react";
import TimeSelector from "../TimeSelector";

export default function WeekSchedule({
  dayWeek,
  _changeTime,
  saveTime,
  openingTime,
  openDay,
  setOpeningTime,
  deleteTime,
}: any) {
  const [newTime, setNewTime] = useState<null | number>(null);

  const handleNewTime = (index: number) => {
    if (newTime == index) return setNewTime(null);

    setNewTime(index);
    setOpeningTime({
      openTime: undefined,
      closeTime: undefined,
      index: undefined,
    });
  };

  let timeOpenTime = null;

  if (typeof newTime === "number") {
    timeOpenTime = dayWeek[newTime]?.openTime;
  }

  const isDisable = timeOpenTime?.some((t: any) => {
    const openTimeSplit = openingTime?.openTime?.split(":");
    const closeTimeSplit = openingTime?.closeTime?.split(":");
    console.log(openTimeSplit, closeTimeSplit);

    const compareStartSplit = t.openTime.split(":");
    const compareEndSplit = t.closeTime.split(":");

    if (Number(openTimeSplit?.[0]) > Number(closeTimeSplit?.[0])) return true;

    // if( Number(openTimeSplit?.[0]) < Number(compareStartSplit[0]) < Number(compareEndSplit[0])) return true
    if (
      Number(compareStartSplit[0]) <= Number(openTimeSplit?.[0]) &&
      Number(openTimeSplit?.[0]) <= Number(compareEndSplit[0])
    )
      return true;

    // console.log(Number(compareStartSplit[0]) < Number(openTimeSplit?.[0]) && Number(openTimeSplit?.[0]) < Number(compareEndSplit[0]))

    console.log(compareStartSplit, "wooo");
    const timeArray = [];

    return t.openTime == openingTime.openTime;
  });

  // console.log(newTime);
  // console.log(timeOpenTime, "time op");
  // console.log(isDisable);

  return (
    <ul className="text-center h-full flex flex-col lg:grid grid-cols-2 justify-between items-center w-full text-black font-bold text-xl gap-4 md:px-2 lg:px-8 relative ">
      {/* <p className=' absolute right-0 z-20 text-2xl text-white'>+</p> */}

      {dayWeek.map((w: any, mapindex: number) => {
        const changeTime = _changeTime(w);

        const saveFun = saveTime(w);

        const timeFrame = dayWeek[mapindex].openTime;

        const deleteTimeFrame = deleteTime(w)

        let shown = undefined;

        if (openingTime.index == mapindex) {
          shown = openingTime;
        }

        // console.log(timeFrame, 'what what in the butt')

        return (
          <li
            className="h-[280px] w-full bg-gray-200 rounded-2xl py-4 pb-6 min-h-80 drop-shadow-xl shadow-xl relative "
            key={w.name}
          >
            <p className="text-start pl-4 text-3xl">{capitalize(w.name)}</p>
            {Array.isArray(timeFrame) && timeFrame.length != 0 && (
              <p
                onClick={() => handleNewTime(mapindex)}
                className="  z-20 text-4xl text-white hover:text-gray-400 cursor-pointer absolute md:right-8 right-6 top-4"
              >
                {newTime == mapindex ? "-" : "+"}
              </p>
            )}
            <div className="flex flex-col w-full justify-between relative h-3/4 mt-1 overflow-auto ">
              {/* <p className="  z-20 text-2xl text-white absolute right-32">+</p> */}

              {(newTime == mapindex ||
                (Array.isArray(timeFrame) && timeFrame.length == 0)) && (
                <>
                  <div className="w-full flex justify-evenly relative">
                    <div className="px-1 w-full md:px-0 md:w-1/3">
                      <TimeSelector
                        type="openTime"
                        changeTime={changeTime}
                        selected={shown?.openTime ?? null}
                        mapIndex={mapindex}
                      />
                    </div>
                    <div className="px-1 w-full md:px-0 md:w-1/3">
                      <TimeSelector
                        type="closeTime"
                        changeTime={changeTime}
                        selected={shown?.closeTime ?? null}
                        mapIndex={mapindex}
                      />
                    </div>
                  </div>
                  {shown && shown.openTime && shown.closeTime && (
                    <div className=" w-full  mx-auto px-8 mt-2 mb-1">
                      <button
                        className=" w-full md:w-2/3  disabled:text-gray-500 outline outline-black outline-1 rounded-full"
                        disabled={isDisable}
                        onClick={() => {
                          saveFun(null, null);
                          setNewTime(null);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </>
              )}

              {Array.isArray(dayWeek[mapindex]?.openTime) && (
                dayWeek[mapindex]?.openTime.map((c: any, openingIn: number) => {
                  // console.log("yo yo oy");

                  return (
                    <div key={openingIn} className="">
                      {/* <p>array</p> */}
                      <div className="w-full flex justify-evenly relative ">
                        <button
                          onClick={() => deleteTimeFrame(openingIn)}
                          className="  z-20 text-2xl text-white hover:text-gray-700 absolute right-0 md:right-20 top-0"
                        >
                          -
                        </button>
                        <div className="px-1 w-full md:px-0 md:w-1/3">
                          <TimeSelector
                            type="openTime"
                            changeTime={changeTime}
                            selected={c?.openTime}
                            mapIndex={mapindex}
                            arrayIndex={openingIn}
                          />
                        </div>
                        <div className="px-1 w-full md:px-0 md:w-1/3">
                          <TimeSelector
                            type="closeTime"
                            changeTime={changeTime}
                            selected={c?.closeTime}
                            mapIndex={mapindex}
                            arrayIndex={openingIn}
                          />
                        </div>
                      </div>
                      {/* {shown && shown.openTime && shown.closeTime && (
                        <button onClick={() => saveFun(null, null, openingIn)}>
                          yo
                        </button>
                      )} */}
                    </div>
                  );
                })
              ) }
            </div>
            <button
              type="button"
              onClick={() => {
                openDay(mapindex);
              }}
              className={` ${
                w.isOpen ? "bg-[#D9643A] text-white" : "bg-[#f5f5f5] text-black"
              } w-1/3 mt-4 rounded-full transition-all duration-300 `}
            >
              {w.isOpen ? "Open" : "Closed"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}



// : (
//   <>
//     {/* <div className="px-1 w-full md:px-0 md:w-1/3">
//       <TimeSelector
//         type="openTime"
//         changeTime={changeTime}
//         selected={dayWeek[mapindex]?.openTime}
       
//       />
//     </div>
//     <div className="px-1 w-full md:px-0 md:w-1/3">
//       <TimeSelector
//         type="closeTime"
//         changeTime={changeTime}
//         selected={dayWeek[mapindex]?.closeTime}
        
//       />
//     </div> */}
//   </>
// )