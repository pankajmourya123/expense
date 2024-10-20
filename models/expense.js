import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
      amountOwed: Number,
      percentage: Number,
    },
  ],
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
