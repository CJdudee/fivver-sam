import { auth } from "@/auth";
import React from "react";
import { serverUser } from "../../lib/serverAuth";
import Package from "@/models/Packages";
import PricingPack from "../../components/pricing/PricingPack";
import { packages } from "@/actions/getPackages";
import PhonePricePack from "@/app/components/users/pricing/PhonePricePack";
import { simpleJson } from "@/utils/helpers";

export default async function Page() {
  const user = await serverUser();

  // const packages = await Package.find().exec()

  const gotPackages = await packages();

  // const packagesJson = await packages.json()

  // if(user) return

  // const {user} = session
  const gotPackagesJson = simpleJson(gotPackages);
  console.log(gotPackages);

  return (
    <div className=" bg-gradient-to-b from-[#242424] via-[#3D3D3D] to-[#3D3D3D] h-full min-h-[800px] overflow-hidden ">
      <div className=" flex flex-col justify-center items-start md:items-center min-h-full h-[92vh]  pb-8 px-2 ">
        <p className="text-center text-3xl pt-2 font-semibold text-white w-full ">
          Pricing and Packages
        </p>
        <p className="mt-1 text-white px-2 w-full md:w-2/3 mx-auto text-center">Pricing depends on the Package picked and Group Size</p>
        <div className="hidden md:flex justify-center  gap-8 mt-6 w-[110vh] md:w-full md:h-1/2 min-h-[375px] ">
          <PricingPack
            // packages={gotPackages}
            packages={gotPackagesJson}
            userId={user?.id}
          />
        </div>
        <PhonePricePack packages={gotPackagesJson} user={user} />
      </div>
    </div>
  );
}
