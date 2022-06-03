import nc from 'next-connect';
import User from '../../models/user'
import dbConnect from '../../utils/db'
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const handler = nc();

handler.post(async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fethitestmail@gmail.com",
            pass: process.env.MAIL_PASS
        }
    })

    const { email } = req.body
    var token = crypto.randomBytes(64).toString('hex');
    await dbConnect()

    User.findOne({ email: email })
        .then(async (saveduser) => {
            // Eğer user var ise mesaj döndür
            if (!saveduser) {
                return res.status(422).json({ message: "user doesn't exists" })
            }

            if (saveduser.verified === false){
                return res.status(422).json({ message: "activate your account first" })
            }

            saveduser.resetToken = token
            saveduser.save()
            
            transporter.sendMail({
                to: email,
                from: "fethitestmail@gmail.com",
                subject: "Reset Token",
                html: `
                <p>Verify your account</p>
                <h5>click in this to reset your password</h5>
                <a href="http://localhost:3000/reset/${token}">link</a>
                `
            })

            return res.status(200).json({message: "token sent"})

        })
})

export default handler