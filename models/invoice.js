import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type:String },
    invoiceid: { type: String },
    invoiceDate: { type: Date },
    salesman: { type:String },
    product: { type: Array },
    discount: { type: Number },
    total: { type: Number },
  }
);

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
export default Invoice;