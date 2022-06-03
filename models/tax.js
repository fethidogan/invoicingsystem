import mongoose from 'mongoose';

const taxSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    percentage: { type: Number },
  }
);

const Tax = mongoose.models.Tax || mongoose.model('Tax', taxSchema);
export default Tax;