const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const PORT = 3000;

require('dotenv').config();
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

app.use(cors());

app.use(express.json());

app.post('/sendmail', async (req, res) => {
    let { to, subject, text } = req.body;

   
    let transporter = nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILJET_USER,
            pass: process.env.MAILJET_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };
    console.log('Mail Options:', mailOptions);

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Detailed error:', error); // Ajoutez cette ligne
        res.status(500).send('Failed to send the email.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
