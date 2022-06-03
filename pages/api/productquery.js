import mongoose from 'mongoose';
import nc from 'next-connect';
import Product from '../../models/product'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()
    const { sortby, currency, search, pricemin, pricemax } = req.query

    var minprice = 0
    var maxprice = 1000000
    if (pricemin) {
        var minprice = Number(pricemin)
    }
    if (pricemax) {
        var maxprice = Number(pricemax)
    }

    var sort = 0
    if (sortby === "cheapfirst") {
        sort = 1
    }
    if (sortby === "expensivefirst") {
        sort = -1
    }

    if (!search && !pricemax && !pricemin) {
        const newOrder = await Product.find({ currency: currency }).sort({ price: sort })
        return res.status(200).json({ message: newOrder })
    }

    if (search && (pricemax || pricemin)) {
        const newOrder = await Product.find({ name: { $regex: `.*${search}.*` }, currency: currency, price: { $gt: minprice, $lt: maxprice } }).sort({ price: sort })
        return res.status(200).json({ message: newOrder })
    }

    if (pricemax || pricemin) {
        const newOrder = await Product.find({ currency: currency, price: { $gt: minprice, $lt: maxprice } }).sort({ price: sort })
        return res.status(200).json({ message: newOrder })
    }



})

export default handler