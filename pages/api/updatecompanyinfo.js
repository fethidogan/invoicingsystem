import mongoose from 'mongoose';
import nc from 'next-connect';
import User from '../../models/user'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { companyName, location } = req.body

    await User.updateOne({ user: req.user._id }, { company: companyName, location: location })
    const user = await User.findOne({ user: req.user._id })
    return res.status(200).json({ message: user })
})

export default handler