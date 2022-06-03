import mongoose from 'mongoose';
import nc from 'next-connect';
import Invoice from '../../models/invoice'
import Expense from '../../models/expenses'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { lastDate } = req.body
    
    if (lastDate === "last30"){
        // aggregation method to sum all prices
        const allsales = await Invoice.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user._id), invoiceDate: { $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000))) } } },
            { $group: { _id: "$user", total: { $sum: "$total" } } }
        ])
    
        // old way of sum all the total prices with reduce
        // const allsales = await Invoice.find({ user: req.user._id, invoiceDate: { $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000))) } })
        // const total = allsales.reduce((a, c) => { return a + Number(c.total) }, 0)
    
        const allexpenses = await Expense.find({ user: req.user._id, date: { $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000))) } })
        const totalexpenses = allexpenses.reduce((a, c) => { return a + Number(c.total) }, 0)
    
        return res.status(200).json({ sales: allsales[0].total, expenses: totalexpenses })
    }
    else {
        const allsales = await Invoice.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user._id), invoiceDate: { $gte: new Date((new Date().getTime() - (90 * 24 * 60 * 60 * 1000))) } } },
            { $group: { _id: "$user", total: { $sum: "$total" } } }
        ])
    
        const allexpenses = await Expense.find({ user: req.user._id, date: { $gte: new Date((new Date().getTime() - (90 * 24 * 60 * 60 * 1000))) } })
        const totalexpenses = allexpenses.reduce((a, c) => { return a + Number(c.total) }, 0)
    
        return res.status(200).json({ sales: allsales[0].total, expenses: totalexpenses })
    }
})

export default handler