import mongoose from 'mongoose';
import nc from 'next-connect';
import Expense from '../../models/expenses'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()

    const allexpenses = await Expense.find({ user: req.user._id })
    return res.status(200).json({ message: allexpenses })
})

export default handler