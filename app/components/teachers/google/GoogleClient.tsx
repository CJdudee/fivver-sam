'use client'

import { googleConsent } from '@/actions/googleLogin'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

export default function GoogleClient() {
    const [gAuth, setgAuth] = useState<string | null>(null)

    const router = useRouter()


    const handleClick = async () => {
        const url = await googleConsent()

        if(url) setgAuth(url)
    }


    useEffect(() => {
        if(!gAuth) return 

        router.push(gAuth)
    }, [gAuth, router])


  return (
    <div className='text-white text-2xl'>
        <button onClick={handleClick}>Log in</button>
    </div>
  )
}
