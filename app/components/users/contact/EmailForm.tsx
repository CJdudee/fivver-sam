'use client'

import { sendEmailFromResend, sendEmailNode } from "@/actions/nodemail";
import { errorToast, susToast } from "@/app/lib/react-toast";
import React, { use, useState } from "react";

export default function EmailForm() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        const emailData = {
            email,
            name,
            message
        }

        const emailSent = await sendEmailFromResend(emailData)

        if(!emailSent) return errorToast()

        setEmail('')
        setName('')
        setMessage('')
        susToast(emailSent.msg)

    }


  return (
    <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 gap-4 outline outline-1 outline-black w-full p-8 rounded-2xl">
  <div className="flex flex-col gap-1">
    <label htmlFor="email" className="text-lg font-bold mb-1">Email</label>
    <input required value={email} onChange={(e) => setEmail(e.target.value)} className="text-black pl-2 py-1 rounded-xl border border-gray-300 shadow-sm  focus:outline-orange-300" id="email"  />
  </div>
  <div className="flex flex-col gap-1">
    <label htmlFor="name" className="text-lg font-bold mb-1">Name</label>
    <input required value={name} onChange={(e) => setName(e.target.value)} id="name" className="text-black pl-2 py-1 rounded-xl border border-gray-300 shadow-sm focus:outline-orange-300"  />
  </div>
  <div className="flex flex-col">
    <label htmlFor="message" className="text-lg font-bold mb-1">Message</label>
    <textarea required rows={8} value={message} onChange={(e) => setMessage(e.target.value)} className="text-black pl-2 py-1 rounded-xl border border-gray-300 shadow-sm resize-none focus:outline-orange-300" />
  </div>
  <button type="submit" className="rounded-full bg-gradient-to-r from-[#D9643A] to-[#E35D5B] hover:text-black py-1">Send</button>
</form>
  );
}
