import { Resend } from 'resend'


const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmLink = `${process.env.HOSTNAME}/api/auth/verification?token=${token}`

    await resend.emails.send({
        from: 'noreply@sprachgeist.com',
        to: email,
        subject: "Verified your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    })
}


export const sendTrialAccountEmail = async(email: string, token: string, username: string, password: string) => {


    const confirmLink = `${process.env.HOSTNAME}/api/auth/verification?token=${token}`

    await resend.emails.send({
        // from: 'onboarding@resend.dev',
        from: 'noreply@sprachgeist.com',
        to: email,
        subject: "Verified your Trial Account",
        html: `<div>
        <p>For Trial Account: ${username}</p>
        <p>Password: ${password}</p>
        <p>Click <a href="${confirmLink}">here</a> to confirm email First.</p>
        </div>`
    })
}

export const sendBoughtEmail = async(email: string, classes: number, group: number, expire: Date) => {
    const emailText = `
    Thank you for your purchase of ${classes} total classes for a group size of ${group}
    These classes will expire on ${expire}
    if any issues or if this wasn't you please contact us at 
    
    info@sprachgeist.com`

    await resend.emails.send({
        from: 'noreply@sprachgeist.com',
        to: email,
        subject: "Package Bought",
        text: emailText
    })

}