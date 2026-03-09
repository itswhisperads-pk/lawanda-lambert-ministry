const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Route to handle form submission
router.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            organization,
            pastorName,
            purpose, // Array
            purposeOther,
            attendees,
            heardFrom, // Array
            heardOther,
            eventDateTime,
            speakingLength,
            website,
            eventAddress,
            eventCityState,
            details
        } = req.body;

        // Basic Validation
        if (!firstName || !lastName || !email || !eventDateTime) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        // Prepare email content
        const purposeList = Array.isArray(purpose) ? purpose.join(', ') : purpose;
        const heardList = Array.isArray(heardFrom) ? heardFrom.join(', ') : heardFrom;

        const mailOptions = {
            from: process.env.EMAIL_USER || 'no-reply@example.com', // Sender address
            to: 'godsanointedevangelisticmin@gmail.com', // Recipient address
            subject: 'New Speaking Engagement Request - G.A.E.M.',
            text: `
New Speaking Engagement Request

Name: ${firstName} ${lastName}
Phone: ${phone || 'N/A'}
Email: ${email}

Church/Organization: ${organization || 'N/A'}
Pastor Name: ${pastorName || 'N/A'}

Purpose of Event: 
${purposeList || 'N/A'} ${purposeOther ? `(Other: ${purposeOther})` : ''}

Number of Attendees: 
${attendees || 'N/A'}

How did they hear about Pastor Lambert: 
${heardList || 'N/A'} ${heardOther ? `(Other: ${heardOther})` : ''}

Event Date/Time: 
${eventDateTime}

Speaking Length: 
${speakingLength || 'N/A'}

Website: 
${website || 'N/A'}

Event Address: 
${eventAddress || 'N/A'}

City/State: 
${eventCityState || 'N/A'}

Event Details: 
${details || 'N/A'}
            `,
            html: `
            <h2>New Speaking Engagement Request</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr>
            <p><strong>Church/Organization:</strong> ${organization || 'N/A'}</p>
            <p><strong>Pastor Name:</strong> ${pastorName || 'N/A'}</p>
            <p><strong>Purpose of Event:</strong> ${purposeList || 'N/A'} ${purposeOther ? `(Other: ${purposeOther})` : ''}</p>
            <p><strong>Number of Attendees:</strong> ${attendees || 'N/A'}</p>
            <p><strong>How did they hear about Pastor Lambert:</strong> ${heardList || 'N/A'} ${heardOther ? `(Other: ${heardOther})` : ''}</p>
            <hr>
            <p><strong>Event Date/Time:</strong> ${eventDateTime}</p>
            <p><strong>Speaking Length:</strong> ${speakingLength || 'N/A'}</p>
            <p><strong>Website:</strong> ${website || 'N/A'}</p>
            <p><strong>Event Address:</strong> ${eventAddress || 'N/A'}</p>
            <p><strong>City/State:</strong> ${eventCityState || 'N/A'}</p>
            <p><strong>Event Details:</strong> ${details || 'N/A'}</p>
            `
        };

        // Transporter configuration
        // NOTE: In a real production environment, use environment variables for sensitive data.
        // Example: process.env.EMAIL_USER, process.env.EMAIL_PASS
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred email service
            auth: {
                user: 'itswhisperads@gmail.com', // Your email
                pass: 'pwer mgnr frtg kqqp'  // Your email password or app-specific password
            }
        });

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Thank you. Your speaking request has been submitted successfully.' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send request. Please try again later.' });
    }
});

module.exports = router;
