import { auth } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";
// import { signOut } from "@/auth";
// import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";
import { serverUser } from "../lib/serverAuth";
import User from "@/models/User";
import Profile from "./Profile";
import { Session } from "next-auth";
import { FaBookmark } from "react-icons/fa";
import { K2D } from "next/font/google";
import Navbar from "./Navbar";
import NavBarHam from "./NavBarHam";
import Token from '@/models/Token'

const k2 = K2D({ subsets: ["latin"], weight: "800" });

export default async function NewNavBar() {
  // const session = await auth()

  const session = await serverUser();

  // console.log(session, 'where is thsi')

  let user = null;

  if (session) {
    user = await User.findOne({ _id: session.id });
  }

  let tokensJson: any = await Token.find({user: user._id})
  
  // console.log(tokens)
  if(!tokensJson.length) {
    tokensJson = null
  } else {
    tokensJson = tokensJson.reduce( (accumlator: number, currentValue: any) => accumlator + currentValue.tokens, 0)
  }


  console.log(tokensJson, 'this is tokesn')

  // const tokens = null
  // const allUser = await User.find({roles: ['user']})

  // console.log(allUser)
  // console.log(user)
  // const {data: session, status, update} = useSession()

  // console.log(session, status)

  return (
    <nav className=" sticky top-0 z-40 ">
      <div className="hidden border-b-1  border-black min-h-[8vh] md:flex items-center justify-between md:px-8  w-full  pb-1   gap-4  bg-[#242424]">
        <Link href={'/'} className=" md:px-[16%] w-fit">
          <div className=" rounded-b-xl bg-gradient-to-r from-[#D9643A] to-[#E35D5B] hover:bg-gradient-to-br transition-all duration-1000 absolute w-fit md:w-[6%] min-h-fit  top-0 flex flex-col min-w-fit active:w-[10%]  ">
            <div className="w-full ">
              <FaBookmark className="text-white ml-auto mr-1" />
            </div>
            <div
              className={` ${k2.className} h-full px-1 text-xl flex flex-col font-extrabold text-white gap-2 `}
            >
              <p className="w-full text-center text-2xl">SPRACH</p>
              <p className="w-full text-center text-2xl -mt-4">GEIST</p>
            </div>
          </div>
        </Link>

        <div className="text-center flex items-center justify-end gap-4 w-full drop-shadow-lg pl-4 h-full ">
          <Link
            href={"/pricing"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Pricing
          </Link>
          <Link
            href={"/teach"}
            className="text-[1.1rem] text-[#D0D0D0]  hover:text-[#858585] transition-all duration-500"
          >
            Teachers
          </Link>
        </div>

        {/* <div className="gap-4 flex items-center justify-end w-1/3 bg-slate-800"> */}
        <div className="w-1/3  ">
          {session && <Profile user={session} tokens={tokensJson} />}

          <div className="flex gap-4 items-center justify-center">
            {!session && <AuthButtons session={session} />}
          </div>
        </div>
      </div>

      <div className="border-b-1  border-black min-h-[8vh] flex items-center justify-start px-4  w-full  pb-1   gap-4  bg-[#242424] md:hidden">
       
        <div className="w-1/2">

        <NavBarHam />
        </div>

        <div className="w-1/2  ">
          {session && <Profile user={session} tokens={tokensJson} />}

          <div className="flex gap-4 items-center justify-center">
            {!session && <AuthButtons session={session} />}
          </div>
        </div>
        
      </div>
    </nav>
  );
}

{
  /* <div className="md:flex gap-2 items-center w-1/3 hidden  ">
<div className="w-10 h-7 bg-red-400 rounded-full relative ">
  <div className="h-1/3 w-full bg-black rounded-t-full absolute top-0"/>
  <div className="h-1/3 w-full bg-red-500 absolute top-0 bottom-0 my-auto"/>
  <div className="h-1/3 w-full bg-yellow-500  rounded-b-full absolute bottom-0"/>
</div>
<h4 className="text-3xl font-mono font-bold bg-slate-800 text-transparent bg-clip-text bg-gradient-to-tr from-purple-500 via-black to-violet-500">Lang-go</h4>
</div> */
}
