import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.HOSTNAME}/api/auth/verification?token=${token}`;

  await resend.emails.send({
    from: "noreply@sprachgeist.com",
    to: email,
    subject: "Verified your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendTrialAccountEmail = async (
  email: string,
  token: string,
  username: string,
  password: string
) => {
  const confirmLink = `${process.env.HOSTNAME}/api/auth/verification?token=${token}`;

  await resend.emails.send({
    // from: 'onboarding@resend.dev',
    from: "noreply@sprachgeist.com",
    to: email,
    subject: "Verified your Trial Account",
    html: `<div>
        <p>For Trial Account: ${username}</p>
        <p>Password: ${password}</p>
        <p>Click <a href="${confirmLink}">here</a> to confirm email First.</p>
        </div>`,
  });
};

export const sendTrialUserDataToMain = async (
  { email, firstName, lastName }: any,
  { weekArray, info }: any
) => {

    const arrayWeek = Object.entries(weekArray).map(([key, value]) => {
        
        return `<p> ${key} </p> <input type="checkbox" checked={${value}} />`
      })

  await resend.emails.send({
    // from: 'onboarding@resend.dev',
    from: "noreply@sprachgeist.com",
    to: `info@sprachgeist.com`,
    subject: "New Trial Account",
    html: `<div>
        <p>User Name: ${firstName} ${lastName}</p>
        <p>Email: ${email}
        <p>Weekdays:</p>
        ${arrayWeek.map((a: string) => a)}
        <p>Week availability -</p>
        <p>${info}</p>
        </div>`,
  });
};

export const sendBoughtEmail = async (
  email: string,
  classes: number,
  group: number,
  expire: Date
) => {
  const emailText = `
    Thank you for your purchase of ${classes} total classes for a group size of ${group}
    These classes will expire on ${expire}
    if any issues or if this wasn't you please contact us at 
    
    info@sprachgeist.com`;

  await resend.emails.send({
    from: "noreply@sprachgeist.com",
    to: email,
    subject: "Package Bought",
    text: emailText,
  });
};

export const bookingEmail = async (
  userEmail: string,
  formatDate: String,
  teacherFullName: { first: string; last: string },
  teacherEmail: string,
  teacherLink?: string
) => {
  let emailText = ``;

  if (teacherLink) {
    emailText = `
        <div>
        <p>Thank you for booking with ${teacherFullName.first} ${teacherFullName.last}</p>
        <p>If any issues or questions for your Teacher contact them at</p>
        <p>${teacherEmail}</p>
        <p>Your appointment with your teacher is booked on</p>
        <p>${formatDate}</p>
        <a href="${teacherLink}">Link for class here.</a>
        </div>
        `;
  } else {
    emailText = `
        <div>
        <p>Thank you for booking with ${teacherFullName.first} ${teacherFullName.last}</p>
        <p>If any issues or questions for your Teacher contact them at</p>
        <p>${teacherEmail}</p>
        <p>Your appointment with your teacher is booked on</p>
        <p>${formatDate}</p>
        <p>Your Teacher will contact you with the classroom Link</p>
        </div>
        `;
  }

  await resend.emails.send({
    from: "noreply@sprachgeist.com",
    to: userEmail,
    subject: "Class Booked",
    html: emailText,
  });
};
