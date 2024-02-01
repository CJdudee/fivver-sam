import { auth } from '@/auth'
import React from 'react'
import { serverUser } from '../../lib/serverAuth'
import Package from '@/models/Packages'
import PricingPack from '../../components/PricingPack'
import { packages } from '@/actions/getPackages'

export default async function Page() {

  const user = await serverUser()

  // const packages = await Package.find().exec()

  const gotPackages = await packages()

  // const packagesJson = await packages.json()

  // if(user) return 

  // const {user} = session

  console.log(gotPackages)

  

  return (
    <div className=' bg-gradient-to-b from-[#242424] via-[#3D3D3D] to-[#3D3D3D] h-full min-h-[92dvh] '>
      <div className=' flex flex-col justify-center items-center min-h-full h-[92vh]  pb-8 '>

        <p className='text-center text-3xl pt-2 font-semibold text-white'>Pricing and Packages</p>
        <div className='flex justify-center gap-8 mt-6 w-full h-1/2'>
          <PricingPack 
          // packages={gotPackages}
          packages={JSON.parse(JSON.stringify(gotPackages))}
          userId={user?.id}
          />
        </div>
          </div>
    </div>
  )
}
