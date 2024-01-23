'use client'

import React from 'react'

export default function WhyUs() {

    const whyUs = [
        {
            reason: 'Teachers',
            text: 'All of our teachers are Native German speaker'
        }, 
        {
            reason: 'Dedicated',
            text: 'Your own personal teacher, following you each step of the way'
        }, 
        {
            reason: 'Expertize',
            text: 'Your teacher has a university degree in German language'
        }, 
        {
            reason: 'Personal',
            text: 'We are a small team of experts, but we are big on personal touch'
        }, 
        {
            reason: 'Flexible',
            text: 'From our reschedule/cancel policy to anything you need, your teacher is there for you'
        }, 
        {
            reason: 'Easy',
            text: 'We use Google Meet© and Google Classroom©'
        }, 
        {
            reason: 'Available',
            text: 'from 8 am to 10 pm, 7 days a week'
        }, 
        {
            reason: 'Adaptable',
            text: 'Time you purchase is yours to spend as fast or as slow as you want within 1 year (but our “Flexible” policy applies here too, so just contact us)'
        }, 
    ]    

    const whyUsJsx = (
        <>
            {whyUs.map((w, index) => {

                return (
                    <div key={index} className={` ${index % 2 == 0 ? 'justify-start' : ' justify-end ml-auto'} flex flex-col md:flex-row justify-center items-center md:gap-8 md:w-1/2 md:outline outline-1 md:px-8 md:py-4 md:rounded-full drop-shadow-2xl md:bg-slate-400 px-2 py-2 `}>
                        <h3 className='text-3xl font-bold font-mono'>{w.reason}:</h3>
                        <p className='text-2xl font-semibold text-slate-800 text-center'>{w.text}.</p>
                    </div>
                )
            })}
        </>
    )

  return (
    <>
    <h3 className='text-center text-3xl md:text-5xl font-bold font-mono mb-6 underline'>Why Us?</h3>
    <div className=' w-full flex flex-col gap-8 mb-8 '>

    {whyUsJsx}
    {/* <div className='text-start flex items-center justify-start gap-8 w-1/2'>
        <h3 className='text-3xl font-bold font-mono'>Teachers:</h3>
        <p className='text-2xl font-semibold text-slate-800'>All of our teachers are Native German speaker.</p>
    </div>
    <div className='text-end flex items-center justify-end gap-8 w-1/2 ml-auto '>
        <h3 className='text-3xl font-bold font-mono'>Dedicated:</h3>
        <p className='text-2xl font-semibold text-slate-800'>Your own personal teacher, following you each step of the way.</p>
    </div>
    <div className='text-start flex items-center justify-start gap-8 w-1/2 '>
        <h3 className='text-3xl font-bold font-mono'>Expertize:</h3>
        <p className='text-2xl font-semibold text-slate-800'>Your teacher has a university degree in German language.</p>
    </div>
    <div className='text-end'>
        <h3 className='text-3xl font-bold font-mono'>Personal:</h3>
        <p>We are a small team of experts, but we are big on personal touch.</p>
    </div>
    <div className='text-start'>
        <h3 className='text-3xl font-bold font-mono'>Flexible:</h3>
        <p>: From our reschedule/cancel policy to anything you need, your teacher is there for you.</p>
    </div>
    <div className='text-start'>
        <h3 className='text-3xl font-bold font-mono'>Easy:</h3>
        <p>We use Google Meet© and Google Classroom©</p>
    </div>
    <div className='text-start'>
        <h3 className='text-3xl font-bold font-mono'>Available:</h3>
        <p>from 8 am to 10 pm, 7 days a week.</p>
    </div>
    <div className='text-start'>
        <h3 className='text-3xl font-bold font-mono'>Adaptable:</h3>
        <p>Time you purchase is yours to spend as fast or as slow as you want within 1 year (but our “Flexible” policy applies here too, so just contact us).</p>
    </div> */}
    </div>
    </>
  )
}
