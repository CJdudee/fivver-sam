import { Resend } from 'resend'


const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmLink = `${process.env.HOSTNAME}/api/auth/verification?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Verified your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    })
}


export const sendTrialAccountEmail = async(email: string, token: string, username: string, password: string) => {


    const confirmLink = `${process.env.HOSTNAME}/api/auth/verification?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Verified your email",
        html: `<div>
        <p>For Trial Account: ${username}</p>
        <p>Password: ${password}</p>
        <p>Click <a href="${confirmLink}">here</a> to confirm email First.</p>
        </div>`
    })
}