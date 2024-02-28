"use client";

import { newVerification } from "@/actions/tokenVerification";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";

export default function NewVerificationForm({verifiedToken}: any) {
  const [error, setError] = useState<string | undefined>(verifiedToken.error);
  const [success, setSuccess] = useState<string | undefined>(verifiedToken.success);

  // console.log(verifiedToken)
  const router = useRouter();

  // const searchParams = useSearchParams();

  // const token = searchParams.get("token");

  // if (!token) router.back();

  // const onSubmit = async () => {
  //   if (!token) return null;

  //   const verifiedToken = await newVerification(token);
  //   setSuccess(verifiedToken.success);
  //   setError(verifiedToken.error);
  // };

  // useEffect(() => {
  //   onSubmit();
  // }, [onSubmit]);

  return (
    <div className="text-center w-full h-full p-52">
      <div className="text-start text-white mb-2 hover:text-gray-200">
        <button onClick={() => router.push("/")}>Go Back</button>
      </div>
      <div className="bg-white flex flex-col justify-center items-center w-full h-full rounded-xl gap-8">
        {!success &&
          (!error && (
            <>
              <p className="text-3xl text-gray-400 font-bold">
                Confirming your email
              </p>
              <CgSpinnerTwo className=" animate-spin w-20 h-20" />
            </>
          ))}
          <p className="text-3xl font-bold">{success}</p>
          <p className="text-3xl font-bold">{error}</p>
          {success || error && <Link className=" font-medium hover:text-gray-400" href={'/'}>Go back home</Link>}
      </div>
    </div>
  );
}
