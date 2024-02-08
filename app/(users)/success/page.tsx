'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {CgSpinner} from 'react-icons/cg'

export default function Page() {

    const [ broughtPackage, setBroughtPackage ] = useState<boolean | {} | null>(null)

    const router = useRouter()

    useEffect(() => {
        const gotPackages = localStorage.getItem('package')

        if(!gotPackages) return setBroughtPackage(false)

        setBroughtPackage(JSON.parse(gotPackages))

    }, [])

    if (broughtPackage === null || broughtPackage === false) {
        if(broughtPackage == false ) router.back()
        return (
            <div className='flex justify-center items-center flex-col h-[94dvh]'>
                
                <CgSpinner className=' animate-spin text-7xl text-indigo-700 ' />
                
            </div>
        )
    }

    // if(broughtPackage === false) {
    //     router.push('/pricing')
    // }

  return (
    <main>
        <button onClick={() => console.log(broughtPackage)}>Click here</button>
    </main>
  )
}
