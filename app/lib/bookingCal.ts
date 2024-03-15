import MonthlyOrder from "@/models/MonthlyOrder";

export const calculateData = async(foundTokens: any, foundTeacher: any, teacherId: string, formated: string) => {
  foundTokens.tokens -= 1;
  await foundTokens.save();

  foundTeacher.orders += 1;

  await foundTeacher.save();

//   console.log(createdBooking);

  let month = await MonthlyOrder.findOne({
    teacher: teacherId,
    date: formated,
  });

  if (!month) {
    month = await MonthlyOrder.create({ date: formated, teacher: teacherId });
  }

  month.orders += 1;

  await month.save();
};
