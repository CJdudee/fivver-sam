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

  // console.log(gotPackages)

  

  return (
    <div>
        <p className='text-center text-3xl mt-4 font-semibold'>Pricing and Packages</p>
        <div className='flex justify-center gap-8 mt-6'>
          <PricingPack 
          // packages={gotPackages}
          packages={JSON.parse(JSON.stringify(gotPackages))}
          userId={user?.id}
          />
        </div>
    </div>
  )
}
