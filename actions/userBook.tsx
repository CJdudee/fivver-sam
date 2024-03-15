"use server";
import { calculateData } from "@/app/lib/bookingCal";
import { bookingEmail, bookingTeacherEmail } from "@/app/lib/mail";
import Booking from "@/models/Booking";
import MonthlyOrder from "@/models/MonthlyOrder";
import Teacher from "@/models/Teacher";
import Token from "@/models/Token";
import User from "@/models/User";
import { simpleJson } from "@/utils/helpers";
import {
  add,
  addHours,
  addMinutes,
  formatDate,
  parse,
  parseISO,
  parseJSON,
} from "date-fns";
import { DateTime } from "luxon";
export const bookAppt = async (
  date: any,
  teacherId: string,
  userId: string,
  groupSize: number
) => {
  // console.log(date)
  // console.log(teacherId)
  // console.log(userId)

  const randTest = DateTime.fromJSDate(date.justDate, { zone: "utc" });

  const setDate = randTest.toUTC().toISO();

  const timeSplit = date.dateTime.split(":");

  const timeFrameCheck = [];

  const interval = 15;

  for (
    let i = Number(timeSplit[0]), p = Number(timeSplit[1]) - 45, c = 0;
    c < 7;
    p = p + interval, c++
  ) {

    if(p < 0) {
      p = 60 + p
      i--
    }

    if(p == 60) {
      p = 0
      i++
    }

    const result = `${i < 10 ? `0${i}` : `${i}`}:${p < 10 ? `0${p}` : `${p}`}`

    timeFrameCheck.push(result);
  }

  // const createdBooking = await Booking.create({
  //   student: userId,
  //   teacher: teacherId,
  //   date: setDate,
  //   time: date.dateTime,
  //   status: "pending",
  //   tokenId: foundTokens._id,
  //   groupSize,
  // });
  // const timeCheck = addMinutes(
  //   addHours(setDate as string, Number(timeSplit[0])),
  //   Number(timeSplit[1])
  // );

  const alreadyBooked = await Booking.find({
    date: setDate,
    time: timeFrameCheck.map((t) => t),
  });
  // console.log(date.dateTime, typeof date.dateTime);
  // console.log(alreadyBooked, setDate);
  // // console.log(parseJSON(timeCheck))
  // // console.log(timeCheck);
  // console.log(timeFrameCheck);

  if (alreadyBooked.length != 0) {
    return { booked: "Time is already booked" };
  }
 

  //   const clientSideTime = DateTime.fromJSDate(date.justDate, { zone: "Europe/Berlin" }).startOf('day').toJSDate()

  // const clientSideLook = DateTime.fromJSDate(date.justDate)
  //   .setZone("Europe/Berlin")
  //   .startOf("day");
  const clientSideLookTest = DateTime.fromJSDate(date.justDate, {
    zone: "Europe/Berlin",
  })
    .startOf("day")
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone, {
      // keepLocalTime: true,
    })
    .plus({
      hours: Number(timeSplit[0]),
      minutes: Number(timeSplit[1]),
    })
    .toFormat("dd LLLL yyyy T z");

  // const clientSideTime = DateTime.fromJSDate(date.justDate)
  //   .setZone("Europe/Berlin", { keepLocalTime: true })
  //   .startOf("day")
  //   .toJSDate();
  const clientSideTime = DateTime.fromJSDate(date.justDate, {
    zone: "Europe/Berlin",
  })
    .startOf("day")
    .toJSDate();

  // const offSet = DateTime.fromJSDate(date.justDate, {
  //   zone: "Europe/Berlin",
  // }).startOf("day").offset;
  //   const clientSideFormat = DateTime.fromJSDate(clientSideTime).plus({hours: Number(timeSplit[0]), minutes: Number(timeSplit[1])}).toFormat('D T z')
  const clientSideFormat = DateTime.fromJSDate(clientSideTime)
    .plus({
      hours: Number(timeSplit[0]),
      minutes: Number(timeSplit[1]),
    })
    .toFormat("dd LLLL yyyy T z");

  const clientTeacherSideTime = DateTime.fromJSDate(date.justDate, {
    zone: "Europe/Berlin",
  })
    .startOf("day")
    .plus({ hours: Number(timeSplit[0]), minutes: Number(timeSplit[1]) })
    .toFormat("dd LLLL yyyy T z");

  // console.log(clientSideFormat, date, timeSplit);
  // console.log(clientSideLookTest, clientTeacherSideTime);
  // return;

  const formated = formatDate(date.justDate, "MM/yy");

  const dateTest = DateTime.fromJSDate(date.justDate, {
    zone: "Europe/Berlin",
  }).toFormat("LLL dd yyyy hh:mm");
  // const dateTest = DateTime.fromISO(`${date.justDate}`).setZone('Europe/Berlin').toFormat('LLL dd yyyy hh:mm')

  // const time = DateTime.now()

  const foundUser = await User.findById(userId).exec();

  const foundTeacher = await Teacher.findById(teacherId)
    .populate("user")
    .exec();

  if (!foundUser || !foundTeacher) return { error: "No user found" };

  const foundTokens = await Token.findOne({
    user: userId,
    groupSize,
    expire: { $gt: new Date() },
    tokens: { $gt: 0 },
  });

  // console.log(foundTokens)
  // return

  if (!foundTokens || foundTokens.tokens == 0)
    return { error: `Not enought Classes for a group size of ${groupSize}` };

  const createdBooking = await Booking.create({
    student: userId,
    teacher: teacherId,
    date: setDate,
    time: date.dateTime,
    status: "pending",
    tokenId: foundTokens._id,
    groupSize,
  });

  if (!createdBooking) return null;

  const teacherFullName = {
    first: foundTeacher.user.firstName,
    last: foundTeacher.user.lastName,
  };

  const userFullName = {
    first: foundUser.firstName,
    last: foundUser.lastName,
  };

  const random = crypto.randomUUID();

  const emailSent = await bookingEmail(
    foundUser.email,
    // clientSideLookTest,
    clientTeacherSideTime,
    teacherFullName,
    foundTeacher.user.email,
    foundTeacher.googleMeetLink,
    random
  );

  const emailSentToTeacher = await bookingTeacherEmail(
    foundUser.email,
    clientTeacherSideTime,
    userFullName,
    foundTeacher.user.email,
    foundTeacher.googleMeetLink,
    random
  );

  await calculateData(foundTokens, foundTeacher, teacherId, formated);

  // foundTokens.tokens -= 1;
  // await foundTokens.save();

  // foundTeacher.orders += 1;

  // await foundTeacher.save();

  // console.log(createdBooking);

  // let month = await MonthlyOrder.findOne({
  //   teacher: teacherId,
  //   date: formated,
  // });

  // if (!month) {
  //   month = await MonthlyOrder.create({ date: formated, teacher: teacherId });
  // }

  // month.orders += 1;

  // await month.save();

  // console.log(month);

  return {
    data: simpleJson(createdBooking),
    msg: "Appointment has been booked",
  };
};
