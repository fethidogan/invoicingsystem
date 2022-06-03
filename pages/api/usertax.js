import mongoose from 'mongoose';
import nc from 'next-connect';
import Tax from '../../models/tax'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()

    const alltaxes = await Tax.find({ user: req.user._id })
    return res.status(200).json({ message: alltaxes })
})

export default handler