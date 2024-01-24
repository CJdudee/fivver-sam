import React from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function TextType() {
    const wordList = [
        {
          ger: 'uns',
          eng: 'Us'
        },
        {
          ger: 'dich',
          eng: 'you'
        },
        {
          ger: 'lernen',
          eng: 'learn'
        },
        {
          ger: 'sie',
          eng: 'she'
        },
        {
          ger: 'ihr',
          eng: 'her'
        },
        {
          ger: 'Ihnen',
          eng: 'Them'
        },
        {
          ger: 'Heute',
          eng: 'today'
        },
      ]
  return (
    <div className='h-full w-full flex justify-center items-center text-4xl md:text-5xl '>
        <p className='w-1/2 text-center'>You</p>
        <p>:</p>
        <div className='w-1/2 text-center'>
            <TypeAnimation
            sequence={[
                'uns', 2000,
                'dich', 3000,
                'lernen', 3000,
                'sie', 3000, 
                'ihr', 1500,
                'Ihnen', 5000, 
                'Heute', 4000
            ]}
            speed={20}
            repeat={Infinity} />
        </div>
    </div>
  )
}
