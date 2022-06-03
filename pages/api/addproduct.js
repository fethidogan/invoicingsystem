import mongoose from 'mongoose';
import nc from 'next-connect';
import Product from '../../models/product'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { name, unit, taxinput, currency, price } = req.body

    const newProduct = new Product({
        user: mongoose.Types.ObjectId(req.user._id),
        name: name,
        unit: unit,
        tax: taxinput,
        currency: currency,
        price: price
    })

    const savedProduct = await newProduct.save()
    return res.status(200).json({ message: savedProduct._id })
})

export default handler