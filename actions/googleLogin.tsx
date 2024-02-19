'use server'
import { google } from 'googleapis';


export const googleConsent = () => {

    const oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GOOGLE_ID,
        process.env.AUTH_GOOGLE_SECRET,
        'http://localhost:3000/teachers/dashboard'
    )
    
    
    const scopes = [
        'https://www.googleapis.com/auth/calendar'
    ]
    
    
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        // prompt: 'consent',
    })

    return url
}
