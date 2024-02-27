'use server'
import nodemailer from 'nodemailer'

import { Resend } from 'resend'


const resend = new Resend(process.env.RESEND_API_KEY)

const transporter = nodemailer.createTransport({
    service: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: 'test@test.com',
        pass: 'random'
    }
    
})

export const sendEmailNode = async (emailData: any) => {

    const info = await transporter.sendMail({
        from: `${emailData.email}`,
        to: 'ceezer45@yahoo.com',
        subject: 'Contact Form',
        text: `${emailData.message} from ${emailData.name}`
    })

    console.log(info)

}

export const sendEmailFromResend = async(emailData: any) => {
    const {email, message, name} = emailData

    const emailSent = await resend.emails.send({
        // from: 'onboarding@resend.dev',
        from: 'contactform@sprachgeist.com',
        to: `info@sprachgeist.com`,
        subject: "Contact Form",
        text: `
        Email: ${email} 
        Name: ${name} 
        Message -
        ${message}
        `
        // html: `<div>
        // <p>For Trial Account: ${username}</p>
        // <p>Password: ${password}</p>
        // <p>Click <a href="${confirmLink}">here</a> to confirm email First.</p>
        // </div>`
    })

    if(!emailSent) return 

    return {msg: "Email has been sent"}

}