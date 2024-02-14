import ViewOverall from "@/app/components/admin/viewTeacher/ViewOverall";
import { decodeUserAndCheckAdmin } from "@/app/lib/finallyRoleCheck";
import { roleChecker } from "@/app/lib/roleCheck";
import { serverUser } from "@/app/lib/serverAuth";
import MonthlyOrder from "@/models/MonthlyOrder";
import Teacher from "@/models/Teacher";
import { capitalize, simpleJson } from "@/utils/helpers";
import { formatDate } from "date-fns";
import React from "react";

export default async function Page() {

  // const sessionUser = await serverUser();

  // roleChecker(sessionUser, ['admin', 'teacher']);

  await decodeUserAndCheckAdmin()

  const teachers = await Teacher.find().populate("user");


  const format = formatDate(new Date(), "MM/yy");

  const foundMonthlyOrders = await MonthlyOrder.find({teacher: teachers.map((t) => t._id)}).exec()
  // const foundMonthlyOrders = await MonthlyOrder.find({teacher: teachers.map((t) => t._id), date: format}).exec()


  
  console.log(foundMonthlyOrders);


  const teacherJson = simpleJson(teachers);

  const foundMonthJson = simpleJson(foundMonthlyOrders)

  return (
    <div className={`text-center text-white h-full min-h-screen px-4 `}>
      <ViewOverall teacherJson={teacherJson} foundMonthJson={foundMonthJson} format={format} />
    </div>
  );
}
