"use server";

import { connectingMongoose } from "@/app/lib/connectMongo";
import Booking from "@/models/Booking";
import MonthlyOrder from "@/models/MonthlyOrder";
import Teacher from "@/models/Teacher";
import Token from "@/models/Token";
import User from "@/models/User";
import { addDays, addHours, addMinutes, formatDate } from "date-fns";

export const cancelBooking = async (bookingId: string) => {
  // await connectingMongoose()
  const foundBooking = await Booking.findOne({ _id: bookingId });

  if (!foundBooking || foundBooking.status == "canceled")
    return { error: "already cancelled" };

  

  console.log(foundBooking);

  foundBooking.status = "canceled";

  const cancelBooking = await foundBooking.save();

  console.log(cancelBooking);
  if (!cancelBooking) return;

  const foundUser = await User.findById(cancelBooking.student);

  if (!foundUser) return { error: "No user found" };

  const foundToken = await Token.findOne({
    user: foundUser._id,
    groupSize: foundBooking.groupSize,
  });

  foundToken.tokens += 1;

  await foundToken.save();

  return { success: "Booking was cancelled" };
  // console.log(foundUser)
  // foundUser.tokens += 1

  // await foundUser.save()
  // const
};

export const userCancelBooking = async (bookingId: string) => {
  // await connectingMongoose()
  const foundBooking = await Booking.findOne({ _id: bookingId });

  if (!foundBooking || foundBooking.status == "canceled")
    return { error: "Already cancelled" };

  console.log(foundBooking);

  const time = new Date(foundBooking.date);

  const splitTime = foundBooking.time.split(':') as string

  const addedHour = addHours(time, Number(splitTime[0]));

  const addedMin = addMinutes(addedHour, Number(splitTime[1]));

  const isFullDay = addDays(new Date(), 1) < addedMin;

  if(!isFullDay) return ({error: 'Too late to cancel'})

//   return

  foundBooking.status = "canceled";

  const cancelBooking = await foundBooking.save();

  console.log(cancelBooking);
  if (!cancelBooking) return;

  const foundUser = await User.findById(cancelBooking.student);

  const foundTeacher = await Teacher.findById(foundBooking.teacher)

  if (!foundUser || !foundTeacher) return { error: "No user found" };

  const format = formatDate(time, "MM/yy");

  const monthlyOrder = await MonthlyOrder.findOne({
    teacher: foundTeacher._id,
    date: format,
  });

  

  const foundToken = await Token.findOne({
    _id: foundBooking.tokenId
  });
  // const foundToken = await Token.findOne({
  //   user: foundUser._id,
  //   groupSize: foundBooking.groupSize,
  // });

  foundToken.tokens += 1;

  foundTeacher.canceledOrders += 1

  monthlyOrder.canceledOrders += 1

  await foundToken.save();

  await foundTeacher.save()

  await monthlyOrder.save()

  return { success: "Booking was cancelled" };
  // console.log(foundUser)
  // foundUser.tokens += 1

  // await foundUser.save()
  // const
};
