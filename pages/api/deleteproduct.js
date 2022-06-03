import mongoose from 'mongoose';
import nc from 'next-connect';
import Product from '../../models/product'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { id } = req.body
    await Product.findOneAndDelete({ _id: id }).exec()
    return res.status(200).json({ message: "deleted" })
})

export default handler