import React from 'react'
import SignUpForm from './SignUpForm'

export default function Page() {
  return (
    <div className=' rounded h-2/3 w-1/2 p-4 flex flex-col items-center justify-center'>
      <div className=' relative w-1/4 text-center '>

      <p className=' left-0 right-0  absolute  bottom-4  text-center  text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-700 inline-block bg-clip-text '>New Account</p>
      </div>
        {/* <SignUpForm /> */}
    </div>
  )
}
