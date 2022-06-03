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
            pass: "fethi123"
        }
    })

    const { email, company, password } = req.body
    var token = crypto.randomBytes(64).toString('hex');
    await dbConnect()

    User.findOne({ email: email })
        .then(async (saveduser) => {
            // Eğer user var ise mesaj döndür
            if (saveduser) {
                return res.status(422).json({ message: "user exists" })
            }

            // user yok ise yenisini oluştur.
            const newUser = new User({
                email: email,
                company: company,
                password: bcrypt.hashSync(password),
                verifyToken: token
            })
            
            const savedUser = await newUser.save()

            transporter.sendMail({
                to: email,
                from: "fethitestmail@gmail.com",
                subject: "Account Verify",
                html: `
                <p>Verify your account</p>
                <h5>click in this  to verify your account</h5>
                <a href="http://localhost:3000/verify/${token}">link</a>
                `
            })

            return res.status(200).json({
                reqid: savedUser._id
            })

        })
})

export default handler