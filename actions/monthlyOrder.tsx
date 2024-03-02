"use server";

import MonthlyOrder from "@/models/MonthlyOrder";
import Teacher from "@/models/Teacher";
import { simpleJson } from "@/utils/helpers";

export const markMonthlyOrder = async (monthId: string) => {
  console.log(monthId);

  const foundMonth = await MonthlyOrder.findOne({ _id: monthId });

  if (!foundMonth) return;

  foundMonth.paid = !foundMonth.paid;

  const monthSave = await foundMonth.save();

  console.log(monthSave);

  return { data: simpleJson(monthSave), msg: "Monthly Order has been marked" };
};

export const addGoogleLink = async (teacherId: string, googleLink: string) => {
  const foundTeacher = await Teacher.findById(teacherId)
    .populate("user")
    .exec();

  if (!foundTeacher) return;

  foundTeacher.googleMeetLink = googleLink;

  const saved = await foundTeacher.save();

  if (!saved) return;

  return { data: simpleJson(saved), msg: ` Class room Link has been added` };
};

export const removeGoogleLink = async (teacherId: string) => {
  const foundTeacher = await Teacher.findById(teacherId)
    .populate("user")
    .exec();

  if (!foundTeacher) return;

  foundTeacher.googleMeetLink = null;

  const saved = await foundTeacher.save();

  if (!saved) return;

  return { data: simpleJson(saved), msg: `Teacher Google Link has been removed`}

};
