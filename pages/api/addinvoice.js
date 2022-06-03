import mongoose from 'mongoose';
import nc from 'next-connect';
import Invoice from '../../models/invoice'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"

const handler = nc();

handler.use(isAuth).post(async (req, res) => {
    await dbConnect()
    const { clientinput, invoiceid, invoiceDate, salesmaninput, product, discount, total } = req.body

    const newInvoice = new Invoice({
        user: mongoose.Types.ObjectId(req.user._id),
        client: clientinput,
        invoiceid: invoiceid,
        invoiceDate: invoiceDate,
        salesman: salesmaninput,
        product: product,
        discount: discount,
        total: total
    })

    const savedInvoice = await newInvoice.save()
    return res.status(200).json({ message: savedInvoice._id })
})

export default handler