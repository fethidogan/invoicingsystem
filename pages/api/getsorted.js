import mongoose from 'mongoose';
import nc from 'next-connect';
import Tax from '../../models/tax'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()
    const { sort } = req.query
    if (sort === "name") {
        const alltaxes = await Tax.find({ user: req.user._id }).sort( { "name": 1 } )
        return res.status(200).json({ message: alltaxes })
    }
    if (sort === "percentage") {
        const alltaxes = await Tax.find({ user: req.user._id }).sort( { "percentage": 1 } )
        return res.status(200).json({ message: alltaxes })
    }

})

export default handler