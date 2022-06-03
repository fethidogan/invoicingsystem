import mongoose from 'mongoose';
import nc from 'next-connect';
import Salesman from '../../models/salesman'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { name, mail, phone } = req.body

    const newSalesman = new Salesman({
        user: mongoose.Types.ObjectId(req.user._id),
        name: name,
        mail: mail,
        phone: phone
    })

    const savedSalesman = await newSalesman.save()
    return res.status(200).json({ message: savedSalesman._id })
})

export default handler