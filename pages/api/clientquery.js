import mongoose from 'mongoose';
import nc from 'next-connect';
import Client from '../../models/clients'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()
    const { sortby, searchname } = req.query
    if (searchname) {
        const newOrder = await Client.find({ fullname: { $regex: `.*${searchname}.*` } }).sort(sortby)
        return res.status(200).json({ message: newOrder })
    }
    const newOrder = await Client.find({}).sort(sortby)
    return res.status(200).json({ message: newOrder })
})

export default handler