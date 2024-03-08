import SettingClient from "@/app/components/admin/settings/SettingClient";
import React from "react";
import AdminSetting from "@/models/AdminSetting";
import { simpleJson } from "@/utils/helpers";
import Teacher from "@/models/Teacher";
import { decodeUserAndCheckAdmin } from "@/app/lib/finallyRoleCheck";
export default async function Page() {

  await decodeUserAndCheckAdmin()

  const adminSetting = await AdminSetting.findOne().populate({
    path: "teacher",
    populate: { path: "user" },
  });

  // console.log(adminSetting, 'what what')

  const foundTeacher = await Teacher.find().populate("user").exec();

  const adminJson = simpleJson(adminSetting);

  const foundTeacherJson = simpleJson(foundTeacher);

  return (
    <div className="h-full min-h-[875px]">
      <p className="text-center  text-3xl pt-5 font-bold text-orange-500">
        Admin Settings
      </p>
      <SettingClient foundTeacher={foundTeacherJson} adminSetting={adminJson} />
    </div>
  );
}
