import mongoose from 'mongoose';
import nc from 'next-connect';
import Invoice from '../../models/invoice'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()

    const allinvoices = await Invoice.find({ user: req.user._id })
    return res.status(200).json({ message: allinvoices })
})

export default handler