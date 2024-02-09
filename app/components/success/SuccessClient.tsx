"use client";
import { getPack } from "@/actions/successPack";
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

    if (!foundPack) return null;

    setBroughtPackage(true);

    setPackageDetail({ ...foundPack, groupSize });
  };

  useEffect(() => {
    const gotPackages = localStorage.getItem("package");

    if (!gotPackages) return setBroughtPackage(false);

    const parsed = JSON.parse(gotPackages);

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
      <div className="text-center flex items-center justify-around flex-col  min-h-[500px] w-full md:w-1/2 mx-auto bg-white py-4 rounded-xl my-auto">
        <p className="text-3xl font-extrabold underline underline-offset-8 mb-4">
          Thank you for your purchase
        </p>

        <p className="text-2xl font-bold">
          You have bought the package:{" "}
          <span className="text-3xl font-bold">{packageDetail.name}</span>
        </p>

        {/* <p>{packageDetail?.priceOne.price}</p> */}
        <div className="flex flex-col text-xl font-bold">
          <p>Package Details:</p>
          {packageDetail && <p>Price {array[packageDetail.groupSize - 1]}</p>}
          {packageDetail && <p>Classes Gain {packageDetail.tokens}</p>}
          {packageDetail && <p>Group Size {packageDetail.groupSize}</p>}
        </div>

        <p className="px-4 text-lg font-semilight text-black">It can take up to an hour for your funds to be processed. While you're waiting you can have a <Link className="underline text-gray-500 hover:text-black underline-offset-2" href={'/teach'}>look at all our teachers Here</Link></p>

        <div className="flex gap-8">
          <Link href={'/'} className="font-semibold px-8 outline outline-1 rounded-full hover:text-gray-600" onClick={() => console.log(packageDetail)}>Go Back Home</Link>
          <Link href={'/'} className="font-semibold px-8 outline outline-1 rounded-full hover:text-gray-600" onClick={() => console.log(packageDetail)}>Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
