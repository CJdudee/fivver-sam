import { capitalize } from "@/utils/helpers";
import React, { useState } from "react";
import TimeSelector from "../TimeSelector";

export default function WeekSchedule({
  dayWeek,
  _changeTime,
  saveTime,
  openingTime,
  openDay,
  setOpeningTime
}: any) {
  const [newTime, setNewTime] = useState<null | number>(null);

  // const reverse = [...dayWeek].reverse()

  const handleNewTime = (index: number) => {
    if (newTime == index) return setNewTime(null);

    setNewTime(index);
    setOpeningTime({
      openTime: undefined,
    closeTime: undefined,
    index: undefined,
    })
  };

  return (
    <ul className="text-center h-full flex flex-col lg:grid grid-cols-2 justify-between items-center w-full text-black font-bold font-mono text-xl gap-4 md:px-2  lg:px-12 relative  ">
      {/* <p className=' absolute right-0 z-20 text-2xl text-white'>+</p> */}

      {dayWeek.map((w: any, mapindex: number) => {
        const changeTime = _changeTime(w);

        const saveFun = saveTime(w);

        const timeFrame = dayWeek[mapindex]?.openTime;

        let shown = undefined;

        if (openingTime.index == mapindex) {
          shown = openingTime;
        }

        return (
          <li
            className="h-full w-full bg-[#cac9c9] rounded-xl py-4 min-h-80 drop-shadow-xl shadow-xl "
            key={w.name}
          >
            <p>{capitalize(w.name)}</p>
            <div className="flex flex-col w-full justify-evenly relative my-auto h-3/4 ">
              {/* <p className="  z-20 text-2xl text-white absolute right-32">+</p> */}
              {(newTime == mapindex ||
                (Array.isArray(timeFrame) && timeFrame.length == 0)) && (
                <>
                  <div className="w-full flex justify-evenly relative">
                    <p
                      onClick={() => handleNewTime(mapindex)}
                      className="  z-20 text-2xl text-white absolute md:right-20 right-0 top-0"
                    >
                      -
                    </p>

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
                    <button className="px-8 rounded-full outline outline-black outline-1 mt-2" onClick={() => {
                      saveFun(null, null)
                      setNewTime(null)
                    }}>Save</button>
                  )}
                </>
              )}

              {Array.isArray(dayWeek[mapindex]?.openTime) ? (
                dayWeek[mapindex]?.openTime.map((c: any, openingIn: number) => {
                  console.log("yo yo oy");

                  return (
                    <>
                      {/* <p>array</p> */}
                      <div className="w-full flex justify-evenly relative">
                        <p
                          onClick={() => handleNewTime(mapindex)}
                          className="  z-20 text-2xl text-white absolute right-0 md:right-20 top-0"
                        >
                          +
                        </p>
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
                    </>
                  );
                })
              ) : (
                <>
                  {/* <div className="px-1 w-full md:px-0 md:w-1/3">
                    <TimeSelector
                      type="openTime"
                      changeTime={changeTime}
                      selected={dayWeek[mapindex]?.openTime}
                     
                    />
                  </div>
                  <div className="px-1 w-full md:px-0 md:w-1/3">
                    <TimeSelector
                      type="closeTime"
                      changeTime={changeTime}
                      selected={dayWeek[mapindex]?.closeTime}
                      
                    />
                  </div> */}
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                openDay(mapindex);
              }}
              className={`${
                w.isOpen ? "bg-[#D9643A]" : "bg-[#f5f5f5]"
              } w-1/3  mt-4 rounded-full transition-all duration-300 `}
            >
              {w.isOpen ? "Open" : "Closed"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
