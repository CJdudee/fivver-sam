import ViewAllUsers from "@/app/components/admin/ViewAllUsers";
import User from "@/models/User";
import { simpleJson } from "@/utils/helpers";
import React from "react";

export default async function Page() {
  const foundUsers = await User.find().select("-password -customerId").exec();

  console.log(foundUsers);

  const foundUserJson = simpleJson(foundUsers);

  return (
    <div className="text-2xl text-center text-white flex flex-col justify-center items-center gap-8">
      <ViewAllUsers foundUserJson={foundUserJson} />
    </div>
  );
}
