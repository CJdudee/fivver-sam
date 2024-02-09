import ViewAllUsers from "@/app/components/admin/ViewAllUsers";
import AssignTeacher from "@/models/AssignTeacher";
import User from "@/models/User";
import { simpleJson } from "@/utils/helpers";
import React from "react";

export default async function Page() {
  const foundUsers = await User.find().select("-password -customerId").exec();

  const foundAssigned = await AssignTeacher.find({user: foundUsers.map((f:any) => f._id)}).populate({path: 'teacher', populate: {
    path: 'user'
  }}).exec()

  console.log(foundAssigned);

  const foundUserJson = simpleJson(foundUsers);

  const foundAssignedJson = simpleJson(foundAssigned)

  return (
    <div className="text-2xl text-center text-white h-full min-h-screen   mx-auto">
      <ViewAllUsers foundUserJson={foundUserJson} foundAssignedJson={foundAssignedJson} />
    </div>
  );
}
