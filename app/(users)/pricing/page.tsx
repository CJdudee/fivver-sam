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
    <div className="  mx-auto px-4 py-8 min-h-[800px] h-full ">
      <div className=" flex flex-col justify-center items-center  min-h-full h-full  pb-4 px-2 w-full  ">
        <div className="md:grid grid-cols-2 w-full mb-4 gap-4  ">
          <div className="  outline-white py-2 px-4  h-full">
            <h1 className="text-2xl font-bold text-orange-500 text-center mb-3">
              Pricing and Packages
            </h1>
            <div className="flex flex-col justify-center items-center w-full">
              <p className="text-lg text-white mb-2 w-full  text-center font-medium">
                Packages are set at a fixed price based on the number of classes
                you receive. Prices increase with group size (max 3).
              </p>
              <Link
                href="/contact"
                className="text-orange-400 hover:text-orange-700"
              >
                Contact Us Here
              </Link>
            </div>
          </div>
          <div className="text-center px-4   outline-white py-2 ">
            <h2 className="text-2xl text-orange-500 font-semibold mb-3">
              How Does Pricing Work?
            </h2>
            <p className="text-lg font-medium  text-white">
              An account has to be made first with a valid email. Then classes
              can be bought and used at your own pace. Each package is set at a
              fixed price that increases with the amount of people added (max
              3).
            </p>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-3 justify-center items-center gap-y-6 lg:gap-y-4 mt-6  h-full   min-h-[375px] gap-4  container w-fit ">
          <PricingPack
            // packages={gotPackages}
            packages={gotPackagesJson}
            userId={user?.id}
          />
        </div>

        <SwiperPhonePrice packages={gotPackagesJson} user={user} />
      </div>
    </div>
  );
}

{
  /* <PhonePricePack packages={gotPackagesJson} user={user} /> */
}
