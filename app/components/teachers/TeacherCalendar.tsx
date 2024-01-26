"use client";

import React from "react";
import Calendar from "react-calendar";

export default function TeacherCalendar({closedDays, setSelectedDate}: any) {
  return (
    <>
      <Calendar
        minDate={new Date()}
        className={"REACT-CALENDAR p-2"}
        view="month"
        onClickDay={(date: any) => {
          setSelectedDate(date);
        }}
        tileClassName={({ date }) => {
          //console.log(closedDays)
          let closedDaysArray: any[] = [];
          closedDays.map((c: any) => {
            // console.log(c)
            // console.log(c.date)
            if (c.date == `${date.toISOString()}`) closedDaysArray.push(c.date);
            else null;
          });

          //console.log(closedDaysArray, 'for css')
          if (closedDaysArray.length) {
            //need fixing
            return "closed-day";
            // return closedDays?.includes(`${date}`) ? 'closed-day' : null
          } else null;
        }}
      />
    </>
  );
}
