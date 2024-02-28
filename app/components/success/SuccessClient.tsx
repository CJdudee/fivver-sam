"use client";
import { getPack } from "@/actions/successPack";
import { capitalize } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export default function SuccessClient({}: any) {
  const [broughtPackage, setBroughtPackage] = useState<boolean | {} | null>(
    null
  );

  const [packageDetail, setPackageDetail] = useState<any>(null);

  const router = useRouter();

  const findPack = async (packageId: string, groupSize: number) => {
    const foundPack = await getPack(packageId);
    console.log(foundPack)
    if (!foundPack) return null;

    setBroughtPackage(true);

    setPackageDetail({ ...foundPack, groupSize });
  };

  useEffect(() => {
    const gotPackages = localStorage.getItem("package");

    if (!gotPackages) return setBroughtPackage(false);

    const parsed = JSON.parse(gotPackages);

    console.log(parsed)

    setBroughtPackage(parsed);

    if (parsed.packageId) {
      findPack(parsed.packageId, parsed.groupSize);
    }
  }, []);

  if (broughtPackage === null || broughtPackage === false) {
    if (broughtPackage == false) router.back();
    return (
      <div className="flex justify-center items-center flex-col h-[94dvh]">
        <CgSpinner className=" animate-spin text-7xl text-indigo-700 " />
      </div>
    );
  }

  const array: any = [
    packageDetail?.priceOne.price,
    packageDetail?.priceTwo.price,
    packageDetail?.priceThree.price,
  ];

  // if(broughtPackage === false) {
  //     router.push('/pricing')
  // }

  return (
    <main className="min-h-[92vh] h-[92vh] flex justify-center items-center">
  <div className="text-center mx-auto bg-gray-50 py-4 rounded-xl my-auto">
    <h1 className="text-3xl font-extrabold text-black mb-4">Purchase Confirmation</h1>

    <section className="mb-4">
      <h2 className="text-2xl font-medium mb-2">Package Details</h2>
      <ul>
        <li className="font-bold">Package name: <span className="font-bold">{capitalize(packageDetail?.name)}</span></li>
        <li className="font-bold">Price: {packageDetail?.priceOne.price}</li>
        <li className="font-bold">Classes Gain: {packageDetail?.tokens}</li>
        <li className="font-bold">Group Size: {packageDetail?.groupSize}</li>
      </ul>
    </section>

    <div className="w-4/5 mx-auto">


    <p className="px-4 text-base mb-4 font-medium">
      It can take up to an hour for your funds to be processed.
      In the meantime, you can explore our 
      <Link href="/teach" className="underline text-orange-600 hover:text-orange-700"> Teachers</Link>
    </p>

    </div>
    <div className="flex justify-center gap-4">
      <Link href="/" className="btn btn-primary bg-gradient-to-r from-[#D9643A] to-[#E35D5B]  px-4 rounded-full py-1 text-white hover:text-black">Go Back Home</Link>
      <Link href="/user/dashboard" className="btn btn-primary bg-gradient-to-r from-[#D9643A] to-[#E35D5B] px-4 rounded-full py-1 text-white hover:text-black">View Dashboard</Link>
    </div>
  </div>
</main>
  );
}
