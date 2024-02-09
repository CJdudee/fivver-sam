import UserProfile from '@/app/components/UserProfile'
import { serverUser } from '@/app/lib/serverAuth'
import User from '@/models/User'
import { simpleJson } from '@/utils/helpers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {

    const user = await serverUser()

    if(!user) redirect('/')

    const foundUser = await User.findOne({_id: user.id}).select('-password').exec()

    const foundUserJson = simpleJson(foundUser)

    console.log(foundUserJson)

  return (
    <div className='h-[92dvh] min-h-[650px] flex items-center justify-center'>
        <UserProfile user={foundUserJson} />
    </div>
  )
}
