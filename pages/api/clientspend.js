import mongoose from 'mongoose';
import nc from 'next-connect';
import Invoice from '../../models/invoice'
import Expense from '../../models/expenses'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()

    const { clientinput } = req.body

    
    const allsales = await Invoice.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user._id), client: clientinput } },
        { $group: { _id: "$client", total: { $sum: "$total" } } }
    ])


    return res.status(200).json({ sales: allsales[0].total })

})

export default handler