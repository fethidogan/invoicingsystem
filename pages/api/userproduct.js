import mongoose from 'mongoose';
import nc from 'next-connect';
import Product from '../../models/product'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()

    const allproducts = await Product.find({ user: req.user._id })
    return res.status(200).json({ message: allproducts })
})

export default handler