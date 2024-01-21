

import React from 'react'
import SignInForm from './signin/SignInForm'

export default function layout({ children }: {
    children: React.ReactNode
}) {
  return (
    <div className='h-screen flex items-center justify-center'>
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
