'use client'
import { checkTokens, googleRefreshToken } from '@/actions/googleToken'
import React from 'react'

export default function CalendarGoogle({teacherCode, userId}: any) {

    const handleRefresh = async () => {
        const tokens = await googleRefreshToken(teacherCode)

        console.log(tokens)
    }

    const handleCheck = async() => {
        const check = await checkTokens(userId)

        console.log(check)
    }

  return (
    <div className='text-white flex gap-4'>
        <button onClick={handleRefresh}>Get tokens</button>
        <button onClick={handleCheck}>check tokens</button>
    </div>
  )
}
