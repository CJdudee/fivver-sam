import Maindash from '@/app/components/users/dashboard/Maindash'
import { serverUser } from '@/app/lib/serverAuth'
import Booking from '@/models/Booking'
import Token from '@/models/Token'
// import { find } from '@/models/User'
import { simpleJson } from '@/utils/helpers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {

  const user = await serverUser()

  if(!user) redirect('/')

  const foundTokens = await Token.find({user: user.id}).sort().exec()

  const foundBooking = await Booking.find({student: user.id, date: {$lt: new Date()}}).populate({path: 'teacher', populate: { path: 'user'}})

  console.log(user, foundBooking)

  const tokensJson = simpleJson(foundTokens)

  const prevBooking = simpleJson(foundBooking)

  return (
    <div className='min-h-[810px] h-[92vh] flex w-full overflow-x-hidden relative'>
      <Maindash tokens={tokensJson} prevBooking={prevBooking} />
      
    </div>
  )
}
