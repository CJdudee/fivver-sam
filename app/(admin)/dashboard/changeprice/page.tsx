
// import CreatePackage from '@/app/components/admin/createPackage'
import CreatePackage from '@/app/components/admin/CreatePackage'
import { decodeUserAndCheckAdmin } from '@/app/lib/finallyRoleCheck'
import Packages from '@/models/Packages'
import { simpleJson } from '@/utils/helpers'
import React from 'react'

export default async function Page() {

  await decodeUserAndCheckAdmin()


    const packages = await Packages.find().exec()

    const packagesJson = simpleJson(packages)

    console.log(packagesJson)
  return (
    <div className='flex  justify-start py-4 flex-col items-center text-white gap-10  min-h-[92vh] h-full  mx-auto'>
        
        <CreatePackage packages={packagesJson} />
    </div>
  )
}
