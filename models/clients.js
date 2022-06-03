import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    salution: { type: String },
    fullname: { type: String },
    company: { type: String },
    mail: { type: String },
    phone: { type: String },
    address: { type: String },
  }
);

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);
export default Client;