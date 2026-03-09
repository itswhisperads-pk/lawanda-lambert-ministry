const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Route to handle prayer request form submission
router.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            message
        } = req.body;

        // Basic Validation
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER || 'no-reply@example.com', // Sender address
            to: 'godsanointedevangelisticmin@gmail.com', // Recipient address
            subject: 'New Prayer Request - G.A.E.M.',
            text: `
New Prayer Request

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'N/A'}
Address: ${address || 'N/A'}

Message/Prayer Request:
${message || 'N/A'}
            `,
            html: `
            <h2>New Prayer Request</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Address:</strong> ${address || 'N/A'}</p>
            <hr>
            <p><strong>Message/Prayer Request:</strong></p>
            <p>${message ? message.replace(/\n/g, '<br>') : 'N/A'}</p>
            `
        };

        // Transporter configuration (Reuse the same configuration or environment variables)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'itswhisperads@gmail.com', // Replace with env variable in production
                pass: 'pwer mgnr frtg kqqp'  // Replace with env variable in production
            }
        });

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Thank you. Your prayer request has been submitted successfully.' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send request. Please try again later.' });
    }
});

module.exports = router;
