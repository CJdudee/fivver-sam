

import React from 'react'
import SignInForm from './signin/SignInForm'

export default function layout({ children }: {
    children: React.ReactNode
}) {
  return (
    <div className='h-full flex items-center justify-center bg-gradient-to-b from-[#242424] via-[#3D3D3D] to-[#3D3D3D]'>
        {children}
        {/* <p>What the fuk</p> */}
    </div>

   
      // <html lang="en">
      //   <body className={''} style={{}}>
         
      //       {children}
          
      //   </body>
      // </html>
    
    // <SignInForm />
  )
}
