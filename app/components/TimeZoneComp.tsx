'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { DateTime } from 'luxon'

export default function TimeZoneComp() {

    const [testTime, setTestTime ] = useState<string | null>(null)
    const [testTime2, setTestTime2 ] = useState<string | null>(null)

    // let formatedTime = null

    
    const updateTimes = useCallback(() => {
        const gerTime = DateTime.now().setZone('Europe/Berlin')
        const time = DateTime.now()

         const formatedTime = gerTime.toFormat("HH:mm:ss a").toLowerCase()

         const timeFormattedAgain = time.toFormat("HH:mm:ss a")

         setTestTime(formatedTime)
         setTestTime2(timeFormattedAgain)
    }, [])

    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    useEffect(() => {

        updateTimes()
    }, [updateTimes])
    

    setInterval(() => {
        updateTimes()
    }, 1000)

    console.log()

  return (
    <div className='text-sm'>
        <p className=''>
        Current Time in Germany
        </p>
        <p className=''> {testTime}</p>
        {/* {testTime2} */}
    </div>
  )
}
