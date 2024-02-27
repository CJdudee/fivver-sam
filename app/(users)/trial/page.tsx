import TrialComp from '@/app/components/users/trial/TrialComp'
import { serverUser } from '@/app/lib/serverAuth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {

  const user = await serverUser()

  // if(user) return redirect('/')

  return (
    <div className='min-h-[92vh] h-full py-8'>
        <TrialComp />
    </div>
  )
}
