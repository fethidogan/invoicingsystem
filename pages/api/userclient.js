import mongoose from 'mongoose';
import nc from 'next-connect';
import Client from '../../models/clients'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()

    const allclients = await Client.find({ user: req.user._id })
    return res.status(200).json({ message: allclients })
})

export default handler