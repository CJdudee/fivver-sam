'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

export default function AuthButtons({session}: {session: Session | null | any}) {

    console.log(session)

  return (
    <>
        {!session?.user ? (
        <>
        <button onClick={() => {
          // signIn('google')
          signIn()
          console.log('hey')
        }}>Login</button>
        <button className="bg-blue-700 rounded-lg p-2 transition-colors hover:bg-blue-500 duration-300  place-content-center align-middle">SignUp</button>
        </>
      ) : (
        <>
          <button className='bg-red-600 rounded-lg p-2 transition-colors hover:bg-red-500 duration-300  place-content-center align-middle text-white' onClick={() => signOut()}>
            SignOut
          </button>
        </>
      )}
    </>
  )
}
