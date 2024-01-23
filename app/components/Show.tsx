import React, { useState } from 'react'

export default function Show() {
    const [nameIn, setNameIn] = useState(0)

    const displayList = [
        {
          name: "Teacher",
          text: "Native German speaker",
        },
        {
          name: "Dedicated",
          text: "Your own personal teacher, following you each step of the way",
        },
        {
          name: "Expertize",
          text: "Your teacher has a university degree in German language",
        },
        {
          name: "Personal",
          text: "We are a small team of experts, but we are big on personal touch",
        },
        {
          name: "Flexible",
          text: "From our reschedule/cancel policy to anything you need, your teacher is there for you",
        },
      ];

    const title = (num: number) => displayList[nameIn + num]?.name

    const prevTitle = (num: number) => displayList[nameIn + num]?.name ?? displayList[displayList.length - 1].name

    const nextTitle = () => displayList[nameIn + 1]?.name ?? displayList[0]?.name

    const slideJsx = (
        <>
            <li className='w-1/3 transition-all absolute  left-0 ' onClick={() => { 
                setNameIn(() => {
                    if(nameIn == 0) {
                        return displayList.length - 1
                    }
                    
                    return nameIn - 1
                })
            }}>
                {prevTitle(-1)}
            </li>
            <li className='w-1/3 transition-all absolute left-100' onClick={() => { setNameIn}}>
                {title(0)}
            </li>
            <li className='w-1/3 transition-all absolute   right-0' onClick={() => { setNameIn(() => {
                if (nameIn === displayList.length - 1) {
                    return 0
                } 
                return nameIn + 1
            })}}>
                {nextTitle()}
            </li>
                </>
       
    )

  return (
    <div className='bg-purple-400 text-center px-5 transition-all '>
        <ul className='flex justify-center items-center w-full transition-all duration-500 relative overflow-hidden text-2xl font-bold font-mono h-8  '>
            
            {slideJsx}
        </ul>
    </div>
  )
}
