import mongoose from 'mongoose';
import nc from 'next-connect';
import Tax from '../../models/tax'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { taxname, taxpercentage } = req.body

    const newTax = new Tax({
        user: mongoose.Types.ObjectId(req.user._id),
        name: taxname,
        percentage: taxpercentage
    })

    const savedTax = await newTax.save()
    return res.status(200).json({ message: savedTax._id })
})

export default handler