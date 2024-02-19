import {
  add,
  addMinutes,
  format,
  formatDate,
  getHours,
  getMinutes,
  isBefore,
  isEqual,
  parse,
} from "date-fns";
import { DateTime } from "luxon";

export const weedayIndexToName = (index: number) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[index];
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const simpleJson = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

export const roundToNearestMinutes = (date: Date, interval: number) => {
  const minutesLeftUntilNextInterval = interval - (getMinutes(date) % interval);

  return addMinutes(date, minutesLeftUntilNextInterval);
};

export const getOpeningTimes = (startDate: Date, dbDays: any) => {
  const dayOfWeek = startDate.getDay();
  const isToday = isEqual(startDate, new Date());

  //edge case
  const today = dbDays.find((d: any) => d.index === dayOfWeek);

  if (!today) throw new Error("this day does not exist on the DB");
  //
  // console.log(today)
  // return

  const todayString = today.openTime.replace(/\s+/g, "");
  const todayEndString = today.closeTime.replace(/\s+/g, "");

  const opening = parse(todayString, "kk:mm", startDate);
  // const opening = parse("10:00", 'kk:mm', startDate)
  const closing = parse(todayEndString, "kk:mm", startDate);

  let hours: number;
  let minutes: number;

  if (isToday) {
    const rounded = roundToNearestMinutes(new Date(), 60);

    const tooLate = !isBefore(rounded, closing);

    if (tooLate) throw new Error("no more bookings today");

    console.log("round", rounded);

    const isBeforeOpening = isBefore(rounded, opening);

    hours = getHours(isBeforeOpening ? opening : rounded);
    minutes = getMinutes(isBeforeOpening ? opening : rounded);
  } else {
    hours = getHours(opening);
    minutes = getMinutes(opening);
  }

  const beginning = add(startDate, { hours, minutes });
  const end = add(startDate, {
    hours: getHours(closing),
    minutes: getMinutes(closing),
  });
  const interval = 60;

  const times = [];

  for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
    times.push(i);
  }

  return times;
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const timeConvert = (time: any) => {
  const formatedKk = Number(format(time, "kk"));

  console.log(formatedKk, typeof formatedKk);

  let numb = null;

  if (formatedKk > 12) {
    numb = formatedKk % 12;
  }

  return numb;
};

export const getOpeningTimeFrame = (startDate: Date, dbDays: any) => {

  const dayOfWeek = startDate.getDay();

  const compareDate = startDate.getDate()

  const realDate = startDate

  startDate =  DateTime.fromJSDate(startDate, { zone: "Europe/Berlin" } ).setLocale("SJ").startOf('day').toJSDate()
  // const dayOfWeek = startDate.day()

  console.log(startDate, 'this isa idfjas')
  // const dayOfWeek = startDate.weekday;

  console.log(dayOfWeek, 'this is index')
  const isToday = isEqual(startDate, new Date());

  //edge case
  const today = dbDays.find((d: any) => d.index === dayOfWeek);

  // console.log(today)

  if (!today) throw new Error("this day does not exist on the DB");

  // console.log(Array.isArray(today.openTime), 'array')
  //
  // console.log(today)
  // return

  const timeFrameArray = today.openTime;

  if (Array.isArray(timeFrameArray)) {


    const times: any[] = [];

    const interval = 60;

    timeFrameArray.map((t) => {

      console.log(t)
      const todayString = t.openTime.replace(/\s+/g, "");
      const todayEndString = t.closeTime.replace(/\s+/g, "");

      // console.log(todayString, todayEndString, 'this is string', today)
      // return

      const opening = parse(todayString, "kk:mm", startDate);
      // console.log(opening, todayString)
      // const opening = parse("10:00", 'kk:mm', startDate)
      const closing = parse(todayEndString, "kk:mm", startDate);

      const realOpening = parse(todayString, "kk:mm", realDate);

      const realClosing = parse(todayEndString, "kk:mm", realDate);

      let hours: number;
      let minutes: number;

      let realHours: number;
      let realMinutes: number;

      hours = getHours(opening);
      minutes = getMinutes(opening);

      realHours = getHours(realOpening)

      realMinutes = getMinutes(realOpening)

      const beginning = add(startDate, { hours, minutes });
      const end = add(startDate, {
        hours: getHours(closing),
        minutes: getMinutes(closing),
      });

      const realBeginning = add(realDate, {hours: realHours, minutes: realMinutes})

      const realEnd = add(realDate, {
        hours: getHours(realClosing),
        minutes: getMinutes(realClosing)
      })
      
     
      for (let i = beginning, p = realBeginning; i <= end; i = add(i, { minutes: interval }), p = add(p, {minutes: interval})) {
        // console.log(i, 'iiii')


        console.log(p, 'the start')
        if(i.getDate() < compareDate) continue 

        times.push({clientDate: i, realDate: p});
      }
    });

    return times
  } else {
  }

  const todayString = today.openTime.replace(/\s+/g, "");
  const todayEndString = today.closeTime.replace(/\s+/g, "");

  // console.log(todayString, todayEndString, 'this is string', today)
  // return

  const opening = parse(todayString, "kk:mm", startDate);
  // const opening = parse("10:00", 'kk:mm', startDate)
  const closing = parse(todayEndString, "kk:mm", startDate);

  // console.log(opening, closing, 'this is close')
  // return

  let hours: number;
  let minutes: number;

  if (isToday) {
    const rounded = roundToNearestMinutes(new Date(), 60);

    const tooLate = !isBefore(rounded, closing);

    if (tooLate) throw new Error("no more bookings today");

    console.log("round", rounded);

    const isBeforeOpening = isBefore(rounded, opening);

    hours = getHours(isBeforeOpening ? opening : rounded);
    minutes = getMinutes(isBeforeOpening ? opening : rounded);
  } else {
    hours = getHours(opening);
    minutes = getMinutes(opening);
  }

  const beginning = add(startDate, { hours, minutes });
  const end = add(startDate, {
    hours: getHours(closing),
    minutes: getMinutes(closing),
  });
  const interval = 60;

  const times = [];

  for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
    times.push(i);
  }

  return times;
};


export const gerFormat = (date: Date) => {

  return formatDate(date, 'dd/MM/yy')
}