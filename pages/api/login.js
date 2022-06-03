import nc from 'next-connect';
import User from '../../models/user'
import dbConnect from '../../utils/db'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const handler = nc();

handler.post(async (req, res) => {

    const { email, password } = req.body
    await dbConnect()

    User.findOne({ email: email })
        .then(async (saveduser) => {
            // Eğer user yok ise mesaj döndür
            if (!saveduser) {
                return res.status(422).json({ message: "user doesnt exists" })
            }
            if (saveduser.verified == false) {
                return res.status(422).json({ message: "sorry not activated" })
            }

            if (saveduser && bcrypt.compareSync(password, saveduser.password)) {
                const token = jwt.sign({ _id: saveduser._id }, "jwt_secret")
                const { email } = saveduser
                const { company } = saveduser
                return res.status(200).json({ token, email: email, company: company })
            }
            else {
                res.status(401).send({ message: 'Invalid email or password' });
            }

        })
})

export default handler