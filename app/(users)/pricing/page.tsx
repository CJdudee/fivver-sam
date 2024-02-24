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
    <div className=" container mx-auto px-4 py-8 min-h-[800px] h-full ">
      <div className=" flex flex-col justify-center items-center  min-h-full h-[92vh]  pb-4 px-2 w-full ">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Pricing and Packages
        </h1>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-lg text-white mb-2 w-full md:w-1/2 text-center">
            Packages are set at a fixed price based on the number of classes you
            receive. Prices increase with group size (max 3).
          </p>
          <Link
            href="/contact"
            className="text-orange-600 hover:text-orange-700"
          >
            Contact Us Here
          </Link>
        </div>
        <div className="hidden md:flex grid-cols-3 justify-center gap-y-32 mt-6 w-full h-max   min-h-[375px] gap-4 ">
          <PricingPack
            // packages={gotPackages}
            packages={gotPackagesJson}
            userId={user?.id}
          />
        </div>

        <SwiperPhonePrice packages={gotPackagesJson} user={user} />
      </div>

      <div className="text-center px-4 py-8 rounded-3xl mt-4">
        <h2 className="text-2xl text-orange-500 font-semibold mb-4">
          How Does Pricing Work?
        </h2>
        <p className="text-lg font-medium  text-white">
          An account has to be made first with a valid email. Then classes can be bought to be used as soon or as slow as you want. Each package is set at a fixed price that increases with the amount of people added (max 3).
        </p>
      </div>
    </div>
  );
}

{
  /* <PhonePricePack packages={gotPackagesJson} user={user} /> */
}
