// import { disableUser } from "@/actions/adminAllUsers";
import ViewAllUsers from "@/app/components/admin/ViewAllUsers";
import { decodeUserAndCheckAdmin } from "@/app/lib/finallyRoleCheck";
import { roleChecker } from "@/app/lib/roleCheck";
import { serverUser } from "@/app/lib/serverAuth";
import AssignTeacher from "@/models/AssignTeacher";
import DisableUser from "@/models/DisableUser";
import User from "@/models/User";
import { simpleJson } from "@/utils/helpers";
import React from "react";

export default async function Page() {

 await decodeUserAndCheckAdmin()

  const foundUsers = await (await User.find().select("-password -customerId")).reverse()

  const foundAssigned = await AssignTeacher.find({user: foundUsers.map((f:any) => f._id)}).populate({path: 'teacher', populate: {
    path: 'user'
  }}).exec()

  const disabledUser = await DisableUser.find({userId: foundUsers.map((f: any) => f._id)})

  console.log(foundAssigned);

  const foundUserJson = simpleJson(foundUsers);

  const foundAssignedJson = simpleJson(foundAssigned)

  const disabledUserJson = simpleJson(disabledUser)

  return (
    <div className="text-2xl text-center text-white h-full min-h-screen   mx-auto">
      <ViewAllUsers foundUserJson={foundUserJson} foundAssignedJson={foundAssignedJson} disabledUser={disabledUserJson} />
    </div>
  );
}
