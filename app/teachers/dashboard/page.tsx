import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col gap-8 justify-evenly w-full items-center p-24 '>
        <Link className='bg-slate-400 rounded-full p-4' href={'/teachers/dashboard/schedule'}>Make Schedule</Link>
        <Link className='bg-slate-400 rounded-full p-4' href={'/teachers/dashboard/booked'}>View booking</Link>
    </div>
  )
}
