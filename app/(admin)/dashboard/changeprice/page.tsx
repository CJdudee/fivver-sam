
// import CreatePackage from '@/app/components/admin/createPackage'
import CreatePackage from '@/app/components/admin/CreatePackage'
import Packages from '@/models/Packages'
import { simpleJson } from '@/utils/helpers'
import React from 'react'

export default async function Page() {

    const packages = await Packages.find().exec()

    const packagesJson = simpleJson(packages)

    console.log(packagesJson)
  return (
    <div className='flex justify-center py-4 flex-col items-center text-white gap-10'>
        <div className='justify-end flex relative w-1/2'>
            <button className=' absolute right-0 text-2xl'>+</button>
        </div>
        <CreatePackage packagesJson={packagesJson} />
    </div>
  )
}
