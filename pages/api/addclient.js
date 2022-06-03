import mongoose from 'mongoose';
import nc from 'next-connect';
import Client from '../../models/clients'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { salution, fullname, company, mail, phone, address } = req.body

    const newClient = new Client({
        user: mongoose.Types.ObjectId(req.user._id),
        salution: salution,
        fullname: fullname,
        company: company,
        mail: mail,
        phone: phone,
        address: address,
    })

    const savedClient = await newClient.save()
    return res.status(200).json({ message: savedClient._id })
})

export default handler