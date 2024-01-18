'use client'
import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
// import 'react-date-picker/src/DatePicker.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function Page() {

    const [ start, setStart ] = useState(new Date())

    const [end , setEnd ] = useState(new Date())

    const SCOPES = 'https://www.googleapis.com/auth/calendar'

    // async function initializeGapiClient() {
    //     await gapi.client.init({
    //         apiKey: process.env.GOOGLE_CLIENT_ID
    //     })
    // }
    async function createCelandarEvent() {

        const endTime = new Date(start)

        endTime.setHours(endTime.getHours() + 1)

        const event = {
            'summary': 'hello',
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                
                'dateTime': endTime.toISOString,
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                
            }
        }

        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ` + 'example'
            },
            body: JSON.stringify(event)
        })
    }

  return (
    <div className='min-h-screen flex justify-center items-center w-full'>
        <div className='  flex flex-col '>

        <DateTimePicker className={' '} 
        calendarClassName={' text-pink-300'}
        onChange={(e) => {
            console.log(e)
            console.log(start,'hello start')
            if(!e) return 
            setStart(e)
        }} value={start} />
        </div>
    </div>
  )
}


{/* <Script type='text/javascript' strategy='beforeInteractive' onReady={() => {
    
}}>
    
    {function gapiLoaded() {
    gapi.load('client', )
    }}

    async function initializeGapiClient(){
    await gapi.client.init({
        
    })
    }
</Script> */}