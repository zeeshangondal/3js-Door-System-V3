const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const EmailSubject="Email Subject"
const EmailBody="Email Body"
const StandardEmailAddress="zeeshangondal0007@gmail.com"
const AppPassword='bvto oqml vqhz mewr'

app.post('/send-email', upload.single('pdfFile'), async (req, res) => {
    const { form } = req.body;
    const formObject = JSON.parse(form);
    // console.log(formObject)
    if (req.file) {
        console.log("file exists")
    }
    console.log(formObject)
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || StandardEmailAddress,
            pass: process.env.EMAIL_PASS || AppPassword,
        },
    });

    const mailOptions = {
        from: StandardEmailAddress,
        to: StandardEmailAddress,
        subject: EmailSubject,
        text: EmailBody,
        attachments: [
            {
                filename: 'document.pdf',
                content: req.file.buffer,
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
