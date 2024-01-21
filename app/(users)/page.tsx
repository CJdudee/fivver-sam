import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import HomePageComp from "../components/HomePageComp";

export default async function Home() {
  const session = await auth();

  // console.log(session)
  // if (!session) redirect("/api/auth/signin");

  // if(session?.user!.roles.includes('admin')) {
  //   return <p>Admin</p>
  // }

  

  return (
    <main className="flex min-h-[92dvh] flex-col items-center justify-start grad from-purple-500  to-purple-800 w-full ">
      <HomePageComp />
    </main>
  );
}

{
  /* <div className='greatGrad from-slate-400 to-gray-700 w-full text-center h-40 p-8 '>
        <h2>Why Us?</h2>
        <p>We believe</p>
      </div>
      <div className='bg-blue-400 w-full text-center h-40'>
        <h2>
        We believe in high quiltay
        </h2>
      </div>
      <div className='bg-yellow-400 w-full text-center h-40'>
        <p>what else</p>
      </div>
      <div className='bg-gray-400 w-full text-center h-40'>
        <p>Something else</p>
      </div>
      <div className='bg-rose-400 w-full text-center h-40'>
        <p>this is yet again some more css</p>
      </div>
      <div className='horizontal '>
        <button >Sign in</button>
      </div> */
}
