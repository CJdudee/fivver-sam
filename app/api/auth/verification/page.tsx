import { newVerification } from '@/actions/tokenVerification'
import NewVerificationForm from '@/app/components/NewVerificationForm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page({searchParams}: any) {
  const token = searchParams.token
  // console.log(req)
  if(!token) redirect('/')

  const verifiedToken = await newVerification(token);

  return (
    <div className='bg-gradient-to-b from-[#242424] via-[#3D3D3D] to-[#3D3D3D] h-screen flex justify-center items-center min-h-[800px]'>
        <NewVerificationForm verifiedToken={verifiedToken} />
    </div>
  )
}
