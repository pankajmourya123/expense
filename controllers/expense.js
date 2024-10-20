import Expense from '../models/expense.js';
import { Parser } from 'json2csv';
import  catchAsyncError  from '../middlewares/catchAsyncError.js';

// Add Expense with Validation and Error Handling
export const addExpense = catchAsyncError(async (req, res, next) => {
  const { amount, participants } = req.body;

  // Ensure there are participants and amount is positive
  if (!amount || amount <= 0 || !participants || participants.length === 0) {
    return next(new ErrorHandler('Invalid amount or participants', 400));
  }

  // Validate the split methods
  let totalPercentage = 0;
  participants.forEach((participant) => {
    if (participant.splitMethod === 'percentage') {
      totalPercentage += participant.percentage;
    } else if (participant.splitMethod === 'exact' && !participant.amountOwed) {
      return next(new ErrorHandler('Please provide exact amounts for exact splits.', 400));
    }
  });

  // Ensure total percentage adds up to 100
  if (totalPercentage > 100) {
    return next(new ErrorHandler('Total percentages must not exceed 100%.', 400));
  }

  const newExpense = new Expense({ amount, participants });
  await newExpense.save();
  res.status(201).json(newExpense);
});

// Get User Expenses with Error Handling
export const getUserExpenses = catchAsyncError(async (req, res, next) => {
  const expenses = await Expense.find({ 'participants.user': req.params.userId });

  if (!expenses) {
    return next(new ErrorHandler('No expenses found for this user', 404));
  }

  res.status(200).json(expenses);
});

// Get Overall Expenses with Error Handling
export const getOverallExpenses = catchAsyncError(async (req, res, next) => {
  const expenses = await Expense.find();
  res.status(200).json(expenses);
});


export const downloadBalanceSheet = catchAsyncError(async (req, res, next) => {
    const expenses = await Expense.find().populate('participants.user', 'name email');
  
    const balanceSheet = expenses.map(exp => ({
      expenseId: exp._id,
      amount: exp.amount,
      participants: exp.participants.map(p => {
        // Check if p.user is not null
        if (p.user) {
          return {
            user: p.user.name,
            splitMethod: p.splitMethod,
            amountOwed: p.amountOwed,
            percentage: p.percentage,
          };
        } else {
          // Handle cases where user is null
          return {
            user: 'Unknown User', // or handle accordingly
            splitMethod: p.splitMethod,
            amountOwed: p.amountOwed,
            percentage: p.percentage,
          };
        }
      }),
    }));
  
    // Convert the balance sheet to CSV format
    const json2csv = new Parser();
    const csv = json2csv.parse(balanceSheet);
  
    res.header('Content-Type', 'text/csv');
    res.attachment('balance_sheet.csv');
    return res.send(csv);
  });