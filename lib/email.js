import { createTransport } from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import connectMongo from "@/models/db";
import { User } from "@/models/user";

const TOKEN = process.env.MAILTRAP_TOKEN
let DOMAIN
if (process.env.ENVIRONMENT === "dev") {
    DOMAIN = process.env.LOCAL
}
else {
    DOMAIN= process.env.PROD
}
async function sendEmail(from, to, subject, text, html) {
    try {
        // Create a transporter
        let transporter = createTransport(
            MailtrapTransport({
                token: TOKEN,
            })
        );

        // Define the email options
        let mailOptions = {
            from: from, // Sender address
            to: to,                       // Recipient address
            subject: subject,             // Subject of the email
            text: text,
            html: html// Plain text body
        };
        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export async function sendVerificationEmail(email, id, verificationToken) {
    const sender = {
        name: "Admin",
        address: "admin@fuzzydevs.com"
    }

    const template = `<!DOCTYPE html>
                        <html>
                            <head>
                                <meta charset="UTF-8">
                                <title>Verify Your Email</title>
                            </head>
                            <body>
                                <h1>Verify Your Email</h1>
                                <p>Thanks for signing up! Please click the link below to verify your email address:</p>
                                <p><a href="${DOMAIN}/verify/${id}?token=${verificationToken}">Verify Email</a></p>
                            </body>
                        </html>`
    await sendEmail(sender, email, "Email Verification", "", template)
}


export async function verifyEmail(id, token) {
    await connectMongo()
    let user = await User.findById(id)
    if (!user) {
        console.log("User does not exist!")
        return false
    }
    if (user.verificationCode === token) {
        user = await User.updateOne({ _id: id }, { verified: true })
        console.log("User verified!")
        return true
    }
    console.log(`Tokens mismatched!`)

    return false
}


// Helper function to generate email content based on role
function generateEmailContent(role, registrationLink) {
    let text, html;
    text = `Hello ,\n\nYou have been invited for role of ${role} in a project on our platform. Please register and check invitations for more information`;
    html = `<p>Hello,</p><p>You have been invited for role of ${role} in a project on our platform.</p><p><a href="${registrationLink}">Click here to register</a></p>`;
    return { text, html };
}


async function sendRegistrationEmails(from, recipients, baseUrl) {
    // Create a transporter for sending emails

    // Loop through recipients and send personalized emails
    for (let recipient of recipients) {
        try {
            const { email, role } = recipient;  // Destructure email and role
            const registrationLink = `${baseUrl}/register?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`;

            // Customize email content based on role
            const emailContent = generateEmailContent(role);

            // Define the email options
            let mailOptions = {
                from: from,
                to: email,
                subject: `You are invited as ${role} for a project`,
                text: emailContent.text,
                html: emailContent.html
            };
            console.log(...mailOptions)
            //  sendEmail(...mailOptions)
        } catch (error) {
            console.error(`Error sending email to ${recipient.email}:`, error);
        }
    }
}
