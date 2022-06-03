import nc from 'next-connect';
import User from '../../models/user'
import dbConnect from '../../utils/db'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handler = nc();

handler.post(async (req, res) => {

    const { id, password } = req.body
    await dbConnect()

    User.findOne({ resetToken: id })
        .then(async (saveduser) => {
            if (saveduser.verified == false){
                return res.status(422).json({ message: "sorry not activated" })
            }

            saveduser.password = bcrypt.hashSync(password)
            saveduser.save()
            return res.status(200).json({ message: "password changed" })
        })
})

export default handler