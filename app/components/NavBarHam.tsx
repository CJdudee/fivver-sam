'use client'

import React, { useState } from 'react'
import { FaHamburger } from 'react-icons/fa'

export default function NavBarHam() {

    const [openNav, setOpenNav ] = useState(false)

  return (
    <div className=''>
        <button onClick={() => setOpenNav(!openNav)} className='text-3xl    '>
            <FaHamburger className='text-white h-8 w-8 ' />
        </button>
    </div>
  )
}
