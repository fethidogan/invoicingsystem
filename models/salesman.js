import mongoose from 'mongoose';

const salesmanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    mail: { type: String },
    phone: { type: String }
  }
);

const Salesman = mongoose.models.Salesman || mongoose.model('Salesman', salesmanSchema);
export default Salesman;