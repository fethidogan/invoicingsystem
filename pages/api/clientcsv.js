import mongoose from 'mongoose';
import nc from 'next-connect';
import Client from '../../models/clients'
import dbConnect from '../../utils/db'
import { isAuth } from "../../utils/auth"
import path from 'path'

const handler = nc();
const { publishMessage, consumeMessage } = require("./rabbitworker")

handler.use(isAuth).get(async (req, res) => {
    await dbConnect()

    const allclients = await Client.find({ user: req.user._id })

    const csvString = [
        [
            "Salution",
            "Fullname",
            "CompanyName",
            "Mail",
            "Phone",
            "Address",
        ],
        ...allclients.map(item => [
            item.salution,
            item.fullname,
            item.company,
            item.mail,
            item.phone,
            item.address,
        ])
    ]
        .map(e => e.join(","))
        .join("\n");

    const sendData = {
        msg : csvString
    }

    await publishMessage(sendData)
    await consumeMessage()
    
    return res.send({ url: "testcsv.csv" })

})

export default handler