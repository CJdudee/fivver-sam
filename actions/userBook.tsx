"use server";
import { bookingEmail } from "@/app/lib/mail";
import Booking from "@/models/Booking";
import MonthlyOrder from "@/models/MonthlyOrder";
import Teacher from "@/models/Teacher";
import Token from "@/models/Token";
import User from "@/models/User";
import { simpleJson } from "@/utils/helpers";
import { formatDate } from "date-fns";
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

  const timeSplit = date.dateTime.split(":")

//   const clientSideTime = DateTime.fromJSDate(date.justDate, { zone: "Europe/Berlin" }).startOf('day').toJSDate()
  const clientSideTime = DateTime.fromJSDate(date.justDate, { zone: "Europe/Berlin" }).startOf('day').toJSDate()
//   const clientSideFormat = DateTime.fromJSDate(clientSideTime).plus({hours: Number(timeSplit[0]), minutes: Number(timeSplit[1])}).toFormat('D T z')
  const clientSideFormat = DateTime.fromJSDate(clientSideTime).plus({hours: Number(timeSplit[0]), minutes: Number(timeSplit[1])}).toFormat('dd LLLL yyyy T z')

  console.log(clientSideFormat, date, timeSplit)
  

  // console.log(randTest.toUTC().toISO(),  'random shit')

  // console.log(typeof date.justDate, date, new Date(date.justDate))

  const formated = formatDate(date.justDate, "MM/yy");
  // console.log(formated)

  // console.log(date, 'datea')

  const myUtc = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  const dateTest = DateTime.fromJSDate(date.justDate, {
    zone: "Europe/Berlin",
  }).toFormat("LLL dd yyyy hh:mm");
  // const dateTest = DateTime.fromISO(`${date.justDate}`).setZone('Europe/Berlin').toFormat('LLL dd yyyy hh:mm')

  // console.log(dateTest, DateTime.utc().setZone('Europe/Berlin').toFormat('yyyy LLL dd hh:mm') )
  // const time = DateTime.now()
  // return
  // MonthlyOrder.updateOne({date: formated}, {orders: })
  // return

  const foundUser = await User.findById(userId).exec();

  const foundTeacher = await Teacher.findById(teacherId).populate('user').exec();

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
    last: foundTeacher.user.lastName
  }

  const emailSent = await bookingEmail(foundUser.email, clientSideFormat, teacherFullName, foundTeacher.user.email, foundTeacher.googleMeetLink)

  // if(!createdBooking) return {error: 'problem with creating booking'}

  foundTokens.tokens -= 1;
  await foundTokens.save();

  foundTeacher.orders += 1;

  await foundTeacher.save();

  console.log(createdBooking);

  let month = await MonthlyOrder.findOne({
    teacher: teacherId,
    date: formated,
  });

  if (!month) {
    month = await MonthlyOrder.create({ date: formated, teacher: teacherId });
  }

  month.orders += 1;

  await month.save();

  console.log(month);

  return {
    data: simpleJson(createdBooking),
    msg: "Appointment has been booked",
  };
};
