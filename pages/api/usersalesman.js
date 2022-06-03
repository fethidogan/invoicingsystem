import mongoose from 'mongoose';
import nc from 'next-connect';
import Salesman from '../../models/salesman'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()

    const allsalesmans = await Salesman.find({ user: req.user._id })
    return res.status(200).json({ message: allsalesmans })
})

export default handler