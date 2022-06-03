import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    total: { type: Number },
    date: { type: Date },
    details: { type: String }
  }
);

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
export default Expense;