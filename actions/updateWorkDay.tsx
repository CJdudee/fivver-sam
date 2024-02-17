"use server";

import ClosedDay from "@/models/ClosedDay";
import TeacherWeek from "@/models/TeacherWeek";
import { gerFormat, simpleJson } from "@/utils/helpers";

export const updateWorkDays = async (id: number, dayObject: any) => {
  const foundWorkDays = await TeacherWeek.findById(id);

  // console.log(dayObject)

  foundWorkDays.weekdays = dayObject;

  const isSaved = await foundWorkDays.save();

  if (!isSaved) return null;

  return { msg: "Week Days has been Updated" };

  console.log(foundWorkDays);
};

export const closeTheDay = async (date: Date, teacherId: string) => {
  if (!date) throw new Error("No Date");

  const createdDate = await ClosedDay.create({ date, teacher: teacherId });
  console.log(createdDate);
  // return createdDate
  return {
    data: simpleJson(createdDate),
    msg: `${gerFormat(date)} has beeen closed`,
  };
};
export const openTheDay = async (date: Date, teacherId: string) => {
  if (!date) throw new Error("No Date");

  const deletedDate = await ClosedDay.findOneAndDelete({
    date,
    teacher: teacherId,
  });
  console.log(deletedDate);
  return {
    data: simpleJson(deletedDate),
    msg: `${gerFormat(date)} has been opened`,
  };
};
