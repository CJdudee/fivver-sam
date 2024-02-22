'use client'

import React from 'react'
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg'
import { useSwiper } from 'swiper/react'

export default function SwiperButtonNav() {
    const swiper = useSwiper()


  return (
    <div className='flex justify-evenly pt-4'>
        <button onClick={() => swiper.slidePrev()} className="text-black  text-xl  z-[100] bg-white rounded-full">
        <CgArrowLeft className="text-2xl hover:text-gray-600" />
        </button>
        <button onClick={() => swiper.slideNext()} className="text-black  text-xl  z-[100] bg-white rounded-full">
        <CgArrowRight className="text-2xl hover:text-gray-600" />
        </button>
    </div>
  )
}
