import mongoose from 'mongoose';
import nc from 'next-connect';
import Expense from '../../models/expenses'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { name, total, details, date } = req.body

    const newExpense = new Expense({
        user: mongoose.Types.ObjectId(req.user._id),
        name: name,
        total: total,
        date: date,
        details: details
    })

    const savedExpense = await newExpense.save()
    return res.status(200).json({ message: savedExpense._id })
})

export default handler