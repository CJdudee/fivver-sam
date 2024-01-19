'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function PricingPack({packages, userId}: any) {

  const [stripeUrl, setStripeUrl ] = useState<{url: string} | null>()
  const [pickedPackage, setPickedPackage ] = useState({})

  const router = useRouter()

  const onBuy = async (packageId: string) => {
    const stripe = await fetch(`${process.env.HOSTNAME}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({packageId: packageId, userId})
    })

    const stripeJson = await stripe.json()

    if(!stripe) return null

    console.log(stripeJson)

    setStripeUrl(stripeJson)
  }

  useEffect(() => {
    if(!stripeUrl?.url) return 

    localStorage.setItem('package', JSON.stringify(pickedPackage))

    console.log(stripeUrl)
    
    router.push(stripeUrl.url)
  }, [stripeUrl])

  // console.log(packages)

  return (
    <>
        {packages && packages.map((p: any, index: number) => {
          console.log(index)
          return (
            <div 
            className={`flex flex-col bg-slate-400 justify-between items-center w-[300px] h-[600px] py-5  outline outline-gray-500 outline-1 rounded-3xl px-6 transition-all hover:w-[350px] hover:h-[625px] duration-300  ${index == 0 && 'rounded-s-none'} ${index == 2 && 'rounded-r-none'}`} 
            key={index}
            >
              <p 
              className='text-2xl font-bold underline underline-offset-2 text-slate-600'
              >
                {p.name}
              </p>
              <div className='flex gap-2 text-xl font-bold '>
                <p>Price</p>
                <p>{p.price}</p>
              </div>
              <div>

                <p className='text-2xl font-semibold'>For {p.individual ? 'Individuals' : 'Groups'}</p>
              </div>

              <button className='bg-blue-400 p-4 rounded-xl w-full '
              onClick={() => { 
                setPickedPackage(p)
                onBuy(p._id)
                }}>
                Buy Package
              </button>
            </div>
          )
        })}
    </>
  )
}
