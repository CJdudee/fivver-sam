import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col justify-evenly w-full items-center p-24 '>
        <Link href={'/teachers/dashboard/schedule'}>Make Schedule</Link>
        <Link href={''}>View booking</Link>
    </div>
  )
}
