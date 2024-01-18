import React from 'react'
import './testhome.css'
import Navbar from '../components/Navbar'

export default function layout( { children } : { children: React.ReactNode}) {
    return (
       
           <>
            {children}
           </>
            
            
           
           
      )
}


 {/* <Script type='text/javascript' onReady={() => {
              
            }}>
              
              {function gapiLoaded() {
                gapi.load('client', )
              }}
    
              async function initializeGapiClient(){
                await gapi.client.init({
                  
                })
              }
            </Script>
            <Script async defer src="https://apis.google.com/js/api.js" onLoad={gapiLoaded()} /> */}
        