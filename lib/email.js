
async function sendEmail(to, subject, text) {
    try {
        // Create a transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any service like Gmail, Yahoo, etc.
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        // Define the email options
        let mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: to,                       // Recipient address
            subject: subject,             // Subject of the email
            text: text,                   // Plain text body
        };

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}