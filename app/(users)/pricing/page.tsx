import { packages } from "@/actions/getPackages";
import PhonePricePack from "@/app/components/users/pricing/PhonePricePack";
import { simpleJson } from "@/utils/helpers";
import PricingPack from "../../components/pricing/PricingPack";
import { serverUser } from "../../lib/serverAuth";
import SwiperPhonePrice from "@/app/components/users/pricing/SwiperPhonePrice";
import Link from "next/link";

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
      <div className=" flex flex-col justify-center items-start md:items-center min-h-full h-[92vh]  pb-4 px-2 ">
        <p className="text-center text-3xl pt-2 font-semibold text-white w-full ">
          Pricing and Packages
        </p>
        {/* <p className="mt-1 text-white px-2 w-full md:w-2/3 mx-auto text-center text-sm">Pricing depends on the Package picked and Group Size</p> */}
        <div className="hidden md:flex justify-center  gap-8 mt-6 w-[110vh] md:w-full md:h-1/2 min-h-[375px] ">
          <PricingPack
            // packages={gotPackages}
            packages={gotPackagesJson}
            userId={user?.id}
          />
        </div>
        {/* <PhonePricePack packages={gotPackagesJson} user={user} /> */}
        <SwiperPhonePrice packages={gotPackagesJson} user={user} />
      </div>

      <div className="px-4 text-center pb-20">
        <p className="text-center text-3xl pt-2 font-semibold text-white w-full">How Does Pricing Work?</p>
        <p className="mt-4 text-white">Packages are set at a fixed priced for the amount of classes you will received. Pricing increase when the group size is increased. The max size for a group can only be 3 (group classes can be booked alone but individual classes can not be booked with a group). If any more question or issues please <Link href={'/contact'} className="underline text-orange-600 hover:text-orange-400 active:text-orange-400 text-lg block mt-1">Contact Us Here</Link> </p>
      </div>
    </div>
  );
}
